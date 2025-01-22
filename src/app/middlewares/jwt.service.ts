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

export const verifyJWT = async (
    token: string,
    secretKey: string,
): Promise<jwt.JwtPayload> => {
    try {
        const cleanedToken = token.replace('Bearer ', '');
        const data = jwt.verify(cleanedToken, secretKey);

        if (typeof data === 'string') {
            throw new Error('Invalid token');
        }

        return data as jwt.JwtPayload;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
