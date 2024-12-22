import Joi from 'joi';
import { typeList } from '../constants/contacts.js';

export const contactCreateSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required.',
  }),
  phoneNumber: Joi.string().required().messages({
    'string.empty': 'Name is required.',
  }),
  email: Joi.string(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...typeList)
    .required(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  phoneNumber: Joi.string().optional(),
  email: Joi.string().optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string()
    .valid(...typeList)
    .optional(),
});
