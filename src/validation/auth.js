import Joi from 'joi';
import { emailRegepx } from '../constants/users.js';

export const userRegistrationSchema = Joi.object({
  name: Joi.string().required().min(3).max(20).messages({
    'string.required': 'Name is required.',
    'string.empty': 'Name is required.',
    'string.min': 'Name should have at least 3 characters.',
    'string.max': 'Name should have at most 20 characters.',
  }),
  email: Joi.string().pattern(emailRegepx).required().messages({
    'string.required': 'Email is required.',
    'string.empty': 'Email should be looks: "example@mail.com".',
  }),
  password: Joi.string().required().messages({
    'string.required': 'Password is required.',
    'string.empty': 'Password should have at least 6 characters.',
  }),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegepx).required().messages({
    'string.required': 'Email is required.',
    'string.empty': 'Email should be looks: "example@mail.com".',
  }),
  password: Joi.string().required().messages({
    'string.required': 'Password is required.',
    'string.empty': 'Password should have at least 6 characters.',
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
    'string.empty': 'Password should have at least 6 characters.',
  }),
});

export const loginWithGoogleOAuthSchema = Joi.object({
  code: Joi.string().required(),
});
