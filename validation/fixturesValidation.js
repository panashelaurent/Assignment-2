import Joi from 'joi';

export const fixturesSchema = Joi.object({
    fixture_code: Joi.string().required(),
    day: Joi.date().required(),
   time: Joi.string().pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).required()
});


