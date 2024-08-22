const router = express.Router();
import express from "express";
import { UserRole } from "../config/role_list.js";
import { addBook } from "../controllers/booksController.js";
import { verifyRoles } from "../middlewares/verifyRoles.js";

router.post("/add", verifyRoles(UserRole.ADMIN), addBook);

export default router;
