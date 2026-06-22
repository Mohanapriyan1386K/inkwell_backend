import express from "express";
import { Signup, Login, getCurrentUser } from "../controllers/AuthController.js";
import { authMiddleware } from "../middleware/Authmiddelware.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/current-user", authMiddleware, getCurrentUser);

export default router;