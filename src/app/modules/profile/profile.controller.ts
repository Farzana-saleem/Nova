import { NextFunction, Request, Response } from 'express';
import { errors, success } from '../../utils/error-handler';
import * as profileService from './profile.service';

export const getProfileController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<any> => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json(
                errors('Autorization not found', 401)
            );
        }

        const accessToken = authorization.split(' ')[1];
        const response: any = await profileService.getProfileService(accessToken);

        return res.status(200).json(
            success(
                'Profle data fetched',
                response,
                200
            )
        );

    } catch (error) {
        return res.status(500).json(
            errors('Fetching profle details failed', 404)
        );
    }
};
