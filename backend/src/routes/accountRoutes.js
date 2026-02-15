import { Router } from "express";
import { authMiddleware } from "../middleware/index.js";
import { createAccount, getAccount } from "../services/index.js";

const router = Router();

router.post("/", authMiddleware, createAccount);
router.get("/", authMiddleware, getAccount);

export default router;