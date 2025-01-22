import { profileRepo } from './profile.repo';
import { errors } from '../../utils/error-handler';
import { Profile } from '../../interfaces/profile.interface';

export const createProfileService = async (userData: Partial<Profile | any>) => {
    const profileExists = await profileRepo.findProfilebyUserId(userData?.userId);

    if (profileExists) {
        return errors(`Profile already exists`, 409)
    }
    const profile = await profileRepo.createProfile(userData);
    return profile;
};

export const updateProfileService = async (userData: Partial<Profile | any>, userId: number) => {
    const profileExists = await profileRepo.findProfilebyUserId(userId);

    if (!profileExists) {
        return errors('Profile not found', 404);
    }
    const profile = await profileRepo.updateProfile(userData, userId);
    return profile;
};

export const getProfileService = async (userId: number) => {
    const profile = await profileRepo.findProfilebyUserId(userId);
    if (!profile) {
        return errors('Profile not found', 404);
    }
    return profile;
};