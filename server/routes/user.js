const router = express.Router();
import express from "express";
import { login, register } from "../controllers/userController.js";

router.post("/register", register);
router.post("/login", login);

export default router;
