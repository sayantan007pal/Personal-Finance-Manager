import { Router } from "express";
import { userSignUp, userLogin, verifyEmail, userLogOut, getUserProfile } from "../services/index.js";
import { authMiddleware } from "../middleware/index.js";

const router = Router();

// public routes (no auth needed)
router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.post("/verifyemail", verifyEmail);

// protected routes
router.get("/logout", authMiddleware, userLogOut);
router.get("/profile", authMiddleware, getUserProfile);

export default router;