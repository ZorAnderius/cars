import Joi from 'joi';

// Схема для створення сервісу (всі поля обов'язкові)
const serviceCreateSchemas = Joi.object({
  type: Joi.string().trim().min(3).max(100).required().messages({
    'string.base': `"type" should be a type of 'text'`,
    'string.empty': `"type" cannot be an empty field`,
    'string.min': `"type" should have a minimum length of {#limit}`,
    'string.max': `"type" should have a maximum length of {#limit}`,
    'any.required': `"type" is a required field`,
  }),
  description: Joi.string().trim().min(3).max(1000).required().messages({
    'string.base': `"description" should be a type of 'text'`,
    'string.empty': `"description" cannot be an empty field`,
    'string.min': `"description" should have a minimum length of {#limit}`,
    'string.max': `"description" should have a maximum length of {#limit}`,
    'any.required': `"description" is a required field`,
  }),
  price: Joi.number().min(0).required().messages({
    'number.base': `"price" should be a type of 'number'`,
    'number.min': `"price" should be at least {#limit}`,
    'any.required': `"price" is a required field`,
  }),
});

// Схема для оновлення сервісу (всі поля опціональні)
const serviceUpdateSchemas = Joi.object({
  type: Joi.string().trim().min(3).max(100).optional().messages({
    'string.base': `"type" should be a type of 'text'`,
    'string.empty': `"type" cannot be an empty field`,
    'string.min': `"type" should have a minimum length of {#limit}`,
    'string.max': `"type" should have a maximum length of {#limit}`,
  }),
  description: Joi.string().trim().min(3).max(1000).optional().messages({
    'string.base': `"description" should be a type of 'text'`,
    'string.empty': `"description" cannot be an empty field`,
    'string.min': `"description" should have a minimum length of {#limit}`,
    'string.max': `"description" should have a maximum length of {#limit}`,
  }),
  price: Joi.number().min(0).optional().messages({
    'number.base': `"price" should be a type of 'number'`,
    'number.min': `"price" should be at least {#limit}`,
  }),
});

export { serviceCreateSchemas, serviceUpdateSchemas };

