import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Local } from '../environment/env';
import dotenv from 'dotenv';
import { log } from 'console';

dotenv.config();

const Secret = 'your_jwt_secret'

const userAuthMiddleware = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        res.status(403).json({ message: 'Access denied. No token provided.' });
        return
    }

    jwt.verify(token, Secret, (err: any, decoded: any) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ message: 'Invalid token.' });

        }

        req.user = decoded;
        next();
    });
};

export default userAuthMiddleware;