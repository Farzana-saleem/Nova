import { profileRepo } from './profile.repo';
import { errors } from '../../utils/error-handler';
import { Profile } from '../../interfaces/profile.interface';

export const createProfileService = async (userData: Partial<Profile | any>) => {
    const profileExists = await profileRepo.findProfilebyUserId(userData?.userId);

    if (profileExists) {
        return errors(`Profile already exists`, 409)
    }
    const user = await profileRepo.createProfile(userData);
    return user;
};

export const updateProfileService = async (userData: Partial<Profile | any>, userId: number) => {
    const profileExists = await profileRepo.findProfilebyUserId(userId);

    if (!profileExists) {
        return errors('Profile not found', 404);
    }
    const user = await profileRepo.updateProfile(userData, userId);
    return user;
};

export const getProfileService = async (userId: number) => {
    const user = await profileRepo.findProfilebyUserId(userId);
    if (!user) {
        return errors('Profile not found', 404);
    }
    return user;
};