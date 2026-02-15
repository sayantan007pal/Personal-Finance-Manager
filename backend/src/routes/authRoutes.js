import { Router } from "express";
import { userSignUp, userLogin, verifyEmail, userLogOut, getUserProfile } from "../services/index.js";

const router = Router();



router.get("/logout", userLogOut);
router.get("/profile", getUserProfile);
router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.post("/verifyemail", verifyEmail);

export default router;