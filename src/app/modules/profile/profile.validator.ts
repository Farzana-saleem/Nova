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