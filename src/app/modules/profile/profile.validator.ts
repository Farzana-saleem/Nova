import Joi from 'joi';

export const validateCreateProfile = (profileData: any) => {
    const schema = Joi.object({
        userId: Joi.number().required(),
        profileId: Joi.string().required(),
        name: Joi.string().required(),
        doc: Joi.string(),
        status: Joi.string()
    });
    return schema.validate(profileData,);
};

export const validateUpdateProfile = (profileData: any) => {
    const schema = Joi.object({
        name: Joi.string(),
        doc: Joi.string(),
        status: Joi.string()
    });
    return schema.validate(profileData,);
};

export const validateLogin = (profileData: any) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Invalid email format',
            'any.required': 'Email is required',
        }),
        password: Joi.string().required(),
    });
    return schema.validate(profileData,);
};