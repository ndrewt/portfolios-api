const config = require('../../config');
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ id: 0, error: true, errors: ['Access denied. No token provided.'] });
    }
    token = token.slice(7);
    try {
        const decoded = jwt.verify(token, config.jwt_secret) as { userId: number };
        (req as any).userId = decoded.userId;

        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ id: 0, error: true, errors: ['Invalid token.'] });
    }
};

export default authMiddleware;
