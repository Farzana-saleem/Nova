import { Request, Response, NextFunction } from 'express';
//import { CustomError } from './custom-error';

export const errorHandler = (
    err: Error | CustomError,
    req: Request,
    res: Response,
) => {
    const statusCode = err instanceof CustomError ? err.statusCode : 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({ error: message });
};

export class CustomError extends Error {
    public statusCode: number;
    public res!: Response;
    constructor(message: string, statusCode: number,) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
        this.res.status(statusCode).json({ error: message });

    }

}

/**
 * @desc    Send any success response
 * @param   {string} message
 * @param   {object | array} results
 * @param   {number} statusCode
 */
export const success = (message: string, data: any, statusCode: number) => {
    return { statusCode: statusCode, message, error: false, data };
};

/**
 * @desc    Send any error response
 * @param   {string} message
 * @param   {number} statusCode
 */
export const errors = (message: string |any, statusCode: number) => { // List of common HTTP request code
    const codes = [
        200,
        201,
        400,
        401,
        404,
        403,
        422,
        500,
        409
    ];

    // Get matched code
    const findCode = codes.find((code) => code == statusCode);

    if (!findCode)
        statusCode = 500;
    else
        statusCode = findCode;


    return { statusCode: statusCode, message, error: true };
};

