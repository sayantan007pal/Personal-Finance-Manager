import {User} from "../models/index.js";
import bcrypt from "bcryptjs";
import {Router} from "express";


const router = Router()



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
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        //find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        //send response
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

router.post('/signup', userSignUp);
router.post('/login', userLogin);

export default router;