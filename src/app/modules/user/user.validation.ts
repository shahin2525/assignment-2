import Joi from 'joi';

const userFullNameValidationSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
});

const addressValidationSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

// Define Joi schema for the User model
const userValidationSchema = Joi.object({
  userId: Joi.number().integer().required(),
  userName: Joi.string().max(20).required().trim(),
  password: Joi.string().required(),
  fullName: userFullNameValidationSchema.required(),
  age: Joi.number().integer().required(),
  email: Joi.string().email().required(),
  isActive: Joi.boolean().required(),
  hobbies: Joi.array().items(Joi.string()).required(),
  address: addressValidationSchema.required(),
});

export default userValidationSchema;
