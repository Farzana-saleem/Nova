import { DB } from '../../../config/db';
import { Profile } from '../../interfaces/profile.interface';

export const repo = {
    getProfile: async (
        userId: string | undefined,
    ): Promise<Partial<Profile> | null> => {
        return await DB.Profile.findOne({
            where: { id: userId },
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
