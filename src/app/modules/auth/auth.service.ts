import { User } from '../../interfaces/user.interfaces';
import authRepo from './auth.repo';
import { compareSync, hash } from 'bcrypt';
import { generateJWT } from '../../middlewares/jwt.service';
import { CustomError, errors } from '../../utils/error-handler';

/*
Register new user service
*/
export const registerService = async (userData: User) => {
    const findUser = await authRepo.findUserByEmail(userData.email);

    //User exists errorr
    if (findUser) {
        return errors(`Email ${userData.email} already exists`, 409)
    }

    const hashedPass = await hash(userData.password, 10);
    const registeredData = await authRepo.createUser({
        ...userData,
        password: hashedPass,
    });
    return { user: registeredData };
};

/*
Login user service
*/
export const loginService = async (userData: User) => {

    const user = await authRepo.findUserByEmail(userData.email);
    if (!user) {
        return errors('Email or password is invalid', 401)
    }

    const comparePassword = compareSync(userData.password, user.password);
    if (!comparePassword) {
        return errors('Email or password is invalid', 401)
    }

    const payload = {
        userId: user.id,
        email: userData.email
    };

    const accessToken = await generateJWT(payload);
    return { user, accessToken };
};
