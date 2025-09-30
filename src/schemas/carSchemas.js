import Joi from 'joi';

const carSchemas = Joi.object({
  model: Joi.string().trim().min(2).max(30).required().messages({
    'string.base': `"model" should be a type of 'text'`,
    'string.empty': `"model" cannot be an empty field`,
    'string.min': `"model" should have a minimum length of {#limit}`,
    'string.max': `"model" should have a maximum length of {#limit}`,
    'any.required': `"model" is a required field`,
  }),
  year: Joi.number().integer().min(1900).max(2050).required().messages({
    'number.base': `"year" should be a type of 'number'`,
    'number.integer': `"year" should be an integer`,
    'number.min': `"year" should be at least {#limit}`,
    'number.max': `"year" should be at most {#limit}`,
    'any.required': `"year" is a required field`,
  }),
  price: Joi.number().min(0).required().messages({
    'number.base': `"price" should be a type of 'number'`,
    'number.min': `"price" should be at least {#limit}`,
    'any.required': `"price" is a required field`,
  }),
  mileage: Joi.number().min(0).required().messages({
    'number.base': `"mileage" should be a type of 'number'`,
    'number.min': `"mileage" should be at least {#limit}`,
    'any.required': `"mileage" is a required field`,
  }),
  bodyStyle: Joi.string().trim().min(2).max(30).required().messages({
    'string.base': `"bodyStyle" should be a type of 'text'`,
    'string.empty': `"bodyStyle" cannot be an empty field`,
    'string.min': `"bodyStyle" should have a minimum length of {#limit}`,
    'string.max': `"bodyStyle" should have a maximum length of {#limit}`,
    'any.required': `"bodyStyle" is a required field`,
  }),
  specs: Joi.string().trim().max(100).optional().messages({
    'string.base': `"specs" should be a type of 'text'`,
    'string.max': `"specs" should have a maximum length of {#limit}`,
  }),
  photo: Joi.string().uri().optional().allow('').messages({
    'string.uri': `"photo" must be a valid URI`,
  }),
});

// Схема для створення автомобіля (всі поля обов'язкові)
const carCreateSchemas = Joi.object({
  model: Joi.string().trim().min(2).max(30).required().messages({
    'string.base': `"model" should be a type of 'text'`,
    'string.empty': `"model" cannot be an empty field`,
    'string.min': `"model" should have a minimum length of {#limit}`,
    'string.max': `"model" should have a maximum length of {#limit}`,
    'any.required': `"model" is a required field`,
  }),
  year: Joi.number().integer().min(1900).max(2050).required().messages({
    'number.base': `"year" should be a type of 'number'`,
    'number.integer': `"year" should be an integer`,
    'number.min': `"year" should be at least {#limit}`,
    'number.max': `"year" should be at most {#limit}`,
    'any.required': `"year" is a required field`,
  }),
  price: Joi.number().min(0).required().messages({
    'number.base': `"price" should be a type of 'number'`,
    'number.min': `"price" should be at least {#limit}`,
    'any.required': `"price" is a required field`,
  }),
  mileage: Joi.number().min(0).required().messages({
    'number.base': `"mileage" should be a type of 'number'`,
    'number.min': `"mileage" should be at least {#limit}`,
    'any.required': `"mileage" is a required field`,
  }),
  bodyStyle: Joi.string().trim().min(2).max(30).required().messages({
    'string.base': `"bodyStyle" should be a type of 'text'`,
    'string.empty': `"bodyStyle" cannot be an empty field`,
    'string.min': `"bodyStyle" should have a minimum length of {#limit}`,
    'string.max': `"bodyStyle" should have a maximum length of {#limit}`,
    'any.required': `"bodyStyle" is a required field`,
  }),
  specs: Joi.string().trim().max(100).optional().messages({
    'string.base': `"specs" should be a type of 'text'`,
    'string.max': `"specs" should have a maximum length of {#limit}`,
  }),
  photo: Joi.string().uri().optional().allow('').messages({
    'string.uri': `"photo" must be a valid URI`,
  }),
});

// Схема для оновлення автомобіля (всі поля опціональні)
const carUpdateSchemas = Joi.object({
  model: Joi.string().trim().min(2).max(30).optional().messages({
    'string.base': `"model" should be a type of 'text'`,
    'string.empty': `"model" cannot be an empty field`,
    'string.min': `"model" should have a minimum length of {#limit}`,
    'string.max': `"model" should have a maximum length of {#limit}`,
  }),
  year: Joi.number().integer().min(1900).max(2050).optional().messages({
    'number.base': `"year" should be a type of 'number'`,
    'number.integer': `"year" should be an integer`,
    'number.min': `"year" should be at least {#limit}`,
    'number.max': `"year" should be at most {#limit}`,
  }),
  price: Joi.number().min(0).optional().messages({
    'number.base': `"price" should be a type of 'number'`,
    'number.min': `"price" should be at least {#limit}`,
  }),
  mileage: Joi.number().min(0).optional().messages({
    'number.base': `"mileage" should be a type of 'number'`,
    'number.min': `"mileage" should be at least {#limit}`,
  }),
  bodyStyle: Joi.string().trim().min(2).max(30).optional().messages({
    'string.base': `"bodyStyle" should be a type of 'text'`,
    'string.empty': `"bodyStyle" cannot be an empty field`,
    'string.min': `"bodyStyle" should have a minimum length of {#limit}`,
    'string.max': `"bodyStyle" should have a maximum length of {#limit}`,
  }),
  specs: Joi.string().trim().max(100).optional().messages({
    'string.base': `"specs" should be a type of 'text'`,
    'string.max': `"specs" should have a maximum length of {#limit}`,
  }),
  photo: Joi.string().uri().optional().allow('').messages({
    'string.uri': `"photo" must be a valid URI`,
  }),
});

export { carCreateSchemas, carUpdateSchemas };
export default carSchemas;
