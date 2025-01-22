import { DB } from '../../../config/db';
import { Profile } from '../../interfaces/profile.interface';

export const profileRepo = {
    createProfile: async (
        profileData: Partial<Profile> | any
    ): Promise<Profile> => {
        return await DB.Profile.create(profileData);
    },

    updateProfile: async (
        profileData: Partial<Profile> | any,
        userId: number
    ): Promise<Profile | any> => {
        return await DB.Profile.update(
            profileData,
            { where: { userId } },
        );
    },

    findProfilebyUserId: async (
        userId: number | undefined,
    ): Promise<Partial<Profile> | null> => {
        return await DB.Profile.findOne({
            where: { userId },
            attributes: {
                exclude:
                    [
                        'created_at',
                        'updated_at'
                    ]
            }
        });
    },
};
