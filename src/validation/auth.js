import Joi from 'joi';
import { emailRegepx } from '../constants/users.js';

export const userRegistrationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegepx).required(),
  password: Joi.string().required(),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegepx).required(),
  password: Joi.string().required(),
});
