import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Router } from "express";

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
        //save user
        const savedUser = await newUser.save();
        //send response
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: savedUser
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
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
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

router.post("/signup", userSignUp);
router.post("/login", userLogin);

export default router;