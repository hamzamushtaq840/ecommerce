const router = express.Router();
import express from "express";
import {
  handleLogout,
  handleRefreshToken,
} from "../controllers/tokenController.js";

router.get("/", handleRefreshToken);
router.get("/logout", handleLogout);

export default router;
