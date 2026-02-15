import { Router } from "express";
import { authMiddleware } from "../middleware/index.js";

const router = Router();

// all transaction routes require authentication
router.use(authMiddleware);

router.get("/", (req, res) => {
    res.json({ message: "Transaction routes" });
});

export default router;