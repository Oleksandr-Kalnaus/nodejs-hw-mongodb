import Joi from 'joi';
import { typeList } from '../constants/contacts.js';

export const contactCreateSchema = Joi.object({
  name: Joi.string().required().min(3).max(20).messages({
    'string.required': 'Name is required.',
    'string.empty': 'Name is required.',
    'string.min': 'Name should have at least 3 characters.',
    'string.max': 'Name should have at most 20 characters.',
  }),
  phoneNumber: Joi.string().required().min(3).max(20).messages({
    'string.empty': 'Phone number is required.',
    'string.min': 'Phone number should have at least 3 characters.',
    'string.max': 'Phone number should have at most 20 characters.',
  }),
  email: Joi.string().min(3).max(20).messages({
    'string.min': 'Email should have at least 3 characters.',
    'string.max': 'Email should have at most 20 characters.',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...typeList)
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.min': 'Contact type should have at least 3 characters.',
      'string.max': 'Contact type should have at most 20 characters.',
    }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional().messages({
    'string.min': 'Name should have at least 3 characters.',
    'string.max': 'Name should have at most 20 characters.',
  }),
  phoneNumber: Joi.string().min(3).max(20).optional().messages({
    'string.min': 'Phone number should have at least 3 characters.',
    'string.max': 'Phone number should have at most 20 characters.',
  }),
  email: Joi.string().min(3).max(20).optional().messages({
    'string.min': 'Email should have at least 3 characters.',
    'string.max': 'Email should have at most 20 characters.',
  }),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string()
    .valid(...typeList)
    .min(3)
    .max(20)
    .optional()
    .messages({
      'string.min': 'Contact type should have at least 3 characters.',
      'string.max': 'Contact type should have at most 20 characters.',
    }),
});
