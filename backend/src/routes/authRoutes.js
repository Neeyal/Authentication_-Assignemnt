import { Router } from "express";
import { register, login, verifyEmail } from "../controllers/authController.js";

const router = Router();
console.log("routecalled");

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/verify-email", verifyEmail);

export default router;
