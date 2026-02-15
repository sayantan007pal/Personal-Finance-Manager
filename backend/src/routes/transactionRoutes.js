import { Router } from "express";
import { authMiddleware } from "../middleware/index.js";
import { createTransaction, getAllTransactions } from "../services/index.js";

const router = Router();

router.post("/", authMiddleware, createTransaction);
router.get("/", authMiddleware, getAllTransactions);

export default router;