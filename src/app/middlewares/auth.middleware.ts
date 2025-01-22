import { CustomError, errors } from '../utils/error-handler';
import { verifyJWT } from './jwt.service';
import { NextFunction, Request, Response } from 'express';

const JWT_SECRET = process.env.JWT_SECRET;

const decodeToken = async (header: string | undefined) => {
    if (!header) {
        throw new CustomError('Authorization header missing', 401);
    }

    const token = header.replace('Bearer ', '');
    const payload = await verifyJWT(token, JWT_SECRET as string);

    return payload;
};

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { method, path } = req;

    if (method === 'OPTIONS' || ['/api/login'].includes(path)) {
        return next();
    }

    try {
        const authHeader =
            req.header('Authorization') || req.header('authorization');
        await decodeToken(authHeader);
        next();
    } catch (error) {
         res.status(401).json(
            errors('Authorization failed', 401)
        );

    }
};
