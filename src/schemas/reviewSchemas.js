import Joi from 'joi';

const reviewCreateSchemas = Joi.object({
  content: Joi.string().trim().min(2).max(2000).required().messages({
    'string.base': `"content" should be a type of 'text'`,
    'string.empty': `"content" cannot be an empty field`,
    'string.min': `"content" should have a minimum length of {#limit}`,
    'string.max': `"content" should have a maximum length of {#limit}`,
    'any.required': `"content" is a required field`,
  }),
  rating: Joi.number().integer().min(1).max(10).optional().messages({
    'number.base': `"rating" should be a type of 'number'`,
    'number.integer': `"rating" should be an integer`,
    'number.min': `"rating" should be at least {#limit}`,
    'number.max': `"rating" should be at most {#limit}`,
  }),
  author: Joi.string().trim().min(2).max(30).required().messages({
    'string.base': `"author" should be a type of 'text'`,
    'string.empty': `"author" cannot be an empty field`,
    'string.min': `"author" should have a minimum length of {#limit}`,
    'string.max': `"author" should have a maximum length of {#limit}`,
    'any.required': `"author" is a required field`,
  }),
  car_id: Joi.string().uuid().required().messages({
    'string.base': `"car_id" should be a type of 'text'`,
    'string.empty': `"car_id" cannot be an empty field`,
    'string.guid': `"car_id" must be a valid UUID`,
    'any.required': `"car_id" is a required field`,
  }),
});

const reviewUpdateSchemas = Joi.object({
  content: Joi.string().trim().min(2).max(2000).optional().messages({
    'string.base': `"content" should be a type of 'text'`,
    'string.empty': `"content" cannot be an empty field`,
    'string.min': `"content" should have a minimum length of {#limit}`,
    'string.max': `"content" should have a maximum length of {#limit}`,
  }),
  rating: Joi.number().integer().min(1).max(10).optional().messages({
    'number.base': `"rating" should be a type of 'number'`,
    'number.integer': `"rating" should be an integer`,
    'number.min': `"rating" should be at least {#limit}`,
    'number.max': `"rating" should be at most {#limit}`,
  }),
  author: Joi.string().trim().min(2).max(30).optional().messages({
    'string.base': `"author" should be a type of 'text'`,
    'string.empty': `"author" cannot be an empty field`,
    'string.min': `"author" should have a minimum length of {#limit}`,
    'string.max': `"author" should have a maximum length of {#limit}`,
  }),
});

export { reviewCreateSchemas, reviewUpdateSchemas };
