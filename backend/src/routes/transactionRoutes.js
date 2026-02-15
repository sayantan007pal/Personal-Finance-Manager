import { Router } from "express";
import { authMiddleware } from "../middleware/index.js";
import { createTransaction } from "../services/index.js";

const router = Router();

router.post("/", authMiddleware, createTransaction);

export default router;