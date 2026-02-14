import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Router } from "express";
import { sendMail } from "../utils/index.js";

const router = Router();

const JWT_EXPIRATION_SECONDS = 24 * 60 * 60; // 1 day

const userSignUp = async (req, res) => {
    try {
        const { username, fullName, email, password } = req.body;
        //hash password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        //create user
        const newUser = new User({
            username,
            fullName,
            email,
            password: hashedPassword
        });

        //save user first so we have an _id for the verification email
        const savedUser = await newUser.save();
        console.log("=> User created:", savedUser);

        //send Verification Email
        try {
            await sendMail({ email, emailType: "VERIFY_EMAIL", userId: savedUser._id });
        } catch (err) {
            console.error("Email sending failed, user deleted:", err);
            await User.findByIdAndDelete(savedUser._id);
            return res.status(500).json({
                message: "Failed to send verification email. Please try again."
            });
        }
        //send response
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: savedUser
        });
    } catch (err) {
        console.error("Error in signup route:", err);
        // Handle MongoDB duplicate key error (code 11000)
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            return res.status(400).json({
                message: `${field} already exists`
            });
        }
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // require email verification before login
        if (!user.isEmailVerified) {
            return res.status(403).json({
                success: false,
                message: "Please verify your email before logging in. Check your inbox for the verification link.",
            });
        }

        // create JWT payload
        const payload = {
            id: user._id,
            email: user.email,
            username: user.username,
        };

        // sign JWT
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: JWT_EXPIRATION_SECONDS,
        });

        // optionally set cookie (Express-style)
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: JWT_EXPIRATION_SECONDS * 1000,
            sameSite: 'lax',
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Invalid verification link. Missing token.",
            });
        }
        const user = await User.findOne({ emailVerificationToken: token });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }
        if (user.isEmailVerified) {
            return res.status(200).json({
                success: true,
                message: "Email is already verified. You can log in.",
            });
        }
        if (!user.emailVerificationToken || user.emailVerificationToken !== token) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification link. Please request a new one.",
            });
        }
        if (user.emailVerificationExpiry && Date.now() > user.emailVerificationExpiry) {
            return res.status(400).json({
                success: false,
                message: "Verification link has expired. Please request a new one.",
            });
        }
        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpiry = undefined;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Email verified successfully. You can now log in.",
        });
    } catch (err) {
        console.error("Error in verifyEmail:", err);
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const userLogOut = async(req, res)=>{
    try {
        res.clearCookie("token");
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

router.get("/logout", userLogOut);
router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.post("/verifyemail", verifyEmail);

export default router;