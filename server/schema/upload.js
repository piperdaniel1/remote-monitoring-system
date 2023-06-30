import Joi from 'joi';

const uploadRecordSchema = Joi.object({
    timestamp: Joi.number().required(),
    deviceStatus: Joi.object({
        battery: Joi.number().required(),
        charging: Joi.boolean().required(),
        volume: Joi.number().required(),
    }).required(),
});

export { uploadRecordSchema };
