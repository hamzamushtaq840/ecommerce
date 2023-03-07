import jwt from 'jsonwebtoken'
import { RefreshToken } from '../models/refreshTokenModel.js';

export const handleRefreshToken = async (req, res) => {
    const refreshToken = req.cookies?.jwt;
    if (!refreshToken) {
        return res.sendStatus(401);
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH);
        const token = await RefreshToken.findOne({ userId: decoded.userId, token: refreshToken });
        if (!token || token.userId !== decoded.userId) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '30s' });
        res.json({ accessToken });
    } catch (error) {
        return res.sendStatus(403);
    }
};