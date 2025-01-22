import { Request, Response } from 'express';
import { verifyJWT } from '../../middlewares/jwt.service';
import { errors, success } from '../../utils/error-handler';
import * as profileService from './profile.service';
import { validateCreateProfile, validateStatusProfile, validateUpdateProfile } from './profile.validator';
const JWT_SECRET = process.env.JWT_SECRET;

export const createProfileController = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const userId = await getIdfromToken(req.headers);
        const profileData = {
            ...req.body,
            userId,
            profileId: `EMP-${userId}`,
            status: 'pending'
        }
        //Error validations
        const { error } = validateCreateProfile(profileData);
        if (error) {
            return res.status(400).json(
                errors(error?.details[0]?.message, 400)
            );
        }

        const response: any = await profileService.createProfileService(profileData);
        if (response?.error) {
            return res.status(response.statusCode).json(
                errors(response?.message, response.statusCode)
            );
        }
        return res.status(200).json(
            success(
                'Profile data created',
                {
                    id: response?.id,
                    userId: response?.userId,
                    profileId: response?.profileId,
                    name: response?.name,
                    doc: response?.doc,
                    status: response?.status
                },
                200
            )
        );

    } catch (error) {
        return res.status(500).json(
            errors('Fetching profle details failed', 404)
        );
    }
};

export const updateProfileController = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const userId = await getIdfromToken(req.headers);

        //Error validations
        const { error } = validateUpdateProfile({ ...req.body });
        if (error) {
            return res.status(400).json(
                errors(error?.details[0]?.message, 400)
            );
        }

        const response: any = await profileService.updateProfileService({ ...req.body }, userId);
        if (response?.error) {
            return res.status(response.statusCode).json(
                errors(response?.message, response.statusCode)
            );
        }
        const profile: any = await profileService.getProfileService(userId);
        return res.status(200).json(
            success(
                'Profile data updated',
                {
                    id: profile?.id,
                    userId: profile?.userId,
                    profileId: profile?.profileId,
                    name: profile?.name,
                    doc: profile?.doc,
                    status: profile?.status
                },
                200
            )
        );

    } catch (error) {
        return res.status(500).json(
            errors('Fetching profle details failed', 404)
        );
    }
};

export const getProfileController = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const userId = await getIdfromToken(req.headers);
        const response: any = await profileService.getProfileService(userId);
        return res.status(200).json(
            success(
                'Profile data fetched',
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

export const profileStatusController = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        //Error validations
        const { error } = validateStatusProfile({ ...req.body });
        if (error) {
            return res.status(400).json(
                errors(error?.details[0]?.message, 400)
            );
        }

        const { userId, status } = req.body;
        if (!(status === 'approved' || status === 'rejected')) {
            return res.status(400).json(
                errors('Wrong status', 400)
            );
        }
        const response: any = await profileService.updateProfileService({ status }, userId);
        if (response?.error) {
            return res.status(response.statusCode).json(
                errors(response?.message, response.statusCode)
            );
        }
        const profile: any = await profileService.getProfileService(userId);
        return res.status(200).json(
            success(
                'Profile status updated',
                {
                    id: profile?.id,
                    userId: profile?.userId,
                    profileId: profile?.profileId,
                    name: profile?.name,
                    doc: profile?.doc,
                    status: profile?.status
                },
                200
            )
        );

    } catch (error) {
        return res.status(500).json(
            errors('Fetching profle details failed', 404)
        );
    }
};

export const getAllProfileController = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const userId = await getIdfromToken(req.headers);
        const response: any = await profileService.getAllProfileService(userId);
        return res.status(200).json(
            success(
                'Profile data fetched',
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


async function getIdfromToken(headers: any) {
    const authorization: any = headers.authorization;
    const accessToken = authorization.split(' ')[1];
    const decodeToken = await verifyJWT(
        accessToken,
        JWT_SECRET as string,
    );
    const userId = decodeToken.userId;
    return userId;
};