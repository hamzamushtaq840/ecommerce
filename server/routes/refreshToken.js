const router = express.Router();
import express from 'express';
import { handleRefreshToken } from '../controllers/refreshTokenController.js';

router.post('/', handleRefreshToken);

export default router;