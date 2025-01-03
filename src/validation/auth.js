import Joi from 'joi';
import { emailRegepx } from '../constants/users.js';

export const userRegistrationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.required': 'Name is required.',
    'string.empty': 'Name is required.',
  }),
  email: Joi.string().pattern(emailRegepx).required().messages({
    'string.required': 'Email is required.',
    'string.empty': 'Email is required.',
  }),
  password: Joi.string().required().messages({
    'string.required': 'Password is required.',
    'string.empty': 'Password is required.',
  }),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegepx).required().messages({
    'string.required': 'Email is required.',
    'string.empty': 'Email is required.',
  }),
  password: Joi.string().required().messages({
    'string.required': 'Password is required.',
    'string.empty': 'Password is required.',
  }),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegepx).required().messages({
    'string.required': 'Email is required.',
    'string.empty': 'Email is required.',
  }),
});

export const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().required().messages({
    'string.required': 'Password is required.',
    'string.empty': 'Password is required.',
  }),
});
