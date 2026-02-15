import { Router } from "express";
import { authMiddleware } from "../middleware/index.js";

const router = Router();

// all account routes require authentication
router.use(authMiddleware);

router.get("/", (req, res) => {
    res.json({ message: "Account routes" });
});

export default router;