import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const generateJWT = async (payload: any) => {
    try {
        const token = `Bearer ${jwt.sign(payload, JWT_SECRET as string)}`;
        return token;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
