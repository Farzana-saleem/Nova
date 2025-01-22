import { User } from '../../interfaces/user.interfaces';
import { DB } from '../../../config/db';

const authRepo = {
    findUserByEmail: async (email: string): Promise<User | null> => {
        return await DB.Users.findOne({ where: { email } });
    },

    createUser: async (userData: User): Promise<User> => {
        return await DB.Users.create(userData);
    },
};

export default authRepo;
