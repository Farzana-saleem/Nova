import { CustomError, errors, success } from '../../utils/error-handler';
import { Request, Response } from 'express';
import * as authService from './auth.service';
import { validateRegister, validateLogin } from './auth.validator';

/*
 * Register new user controller
 */
export const registerController = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const userData = req.body;

        //Error validations
        const { error } = validateRegister(userData);
        if (error) {
            return res.status(400).json(
                errors(error?.details[0]?.message, 400)
            );
        }

        const response: any = await authService.registerService(userData);
        if (response?.error) {
            return res.status(response.statusCode).json(
                errors(response?.message, response.statusCode)
            );
        }
        return res.status(201).json(
            success(
                'Registeration successful.',
                {
                    id: response?.user.id,
                    email: response?.user.email
                },
                201
            )
        );
    } catch (error: any) {
        return res.status(500).json(
            errors('Registeration failed', 500)
        );
    }
};


/*
 * Login user controller
 */
export const loginController = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const userData = req.body;

        //Error validations
        const { error } = validateLogin(userData);
        if (error) {
            return res.status(400).json(
                errors(error?.details[0]?.message, 400)
            );
        }

        const response: any = await authService.loginService(userData);
        if (response?.error) {
            return res.status(response.statusCode).json(
                errors(response?.message, response.statusCode)
            );
        }

        return res.status(201).json(
            success(
                'Login successful.',
                {
                    id: response?.user.id,
                    email: response?.user.email,
                    accessToken: response?.accessToken
                },
                201
            )
        );
    } catch (error: any) {
        return res.status(500).json(
            errors('Login failed', 500)
        );
    }
};
