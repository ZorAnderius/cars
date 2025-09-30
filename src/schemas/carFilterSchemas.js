import Joi from 'joi';

// Схема для валідації параметрів фільтрації автомобілів
const carFilterSchemas = Joi.object({
  year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).optional().messages({
    'number.base': `"year" should be a type of 'number'`,
    'number.integer': `"year" should be an integer`,
    'number.min': `"year" should be at least {#limit}`,
    'number.max': `"year" should be at most {#limit}`,
  }),
  model: Joi.string().trim().min(1).max(100).optional().messages({
    'string.base': `"model" should be a type of 'text'`,
    'string.empty': `"model" cannot be an empty field`,
    'string.min': `"model" should have a minimum length of {#limit}`,
    'string.max': `"model" should have a maximum length of {#limit}`,
  }),
  priceMin: Joi.number().min(0).optional().messages({
    'number.base': `"priceMin" should be a type of 'number'`,
    'number.min': `"priceMin" should be at least {#limit}`,
  }),
  priceMax: Joi.number().min(0).optional().messages({
    'number.base': `"priceMax" should be a type of 'number'`,
    'number.min': `"priceMax" should be at least {#limit}`,
  }),
  bodyStyle: Joi.string().trim().min(1).max(50).optional().messages({
    'string.base': `"bodyStyle" should be a type of 'text'`,
    'string.empty': `"bodyStyle" cannot be an empty field`,
    'string.min': `"bodyStyle" should have a minimum length of {#limit}`,
    'string.max': `"bodyStyle" should have a maximum length of {#limit}`,
  }),
});

export { carFilterSchemas };
