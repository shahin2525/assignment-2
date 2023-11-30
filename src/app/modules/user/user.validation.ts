import Joi from 'joi';

const userFullNameValidationSchema = Joi.object({
  firstName: Joi.string().trim().required().max(20).min(1),
  lastName: Joi.string().trim().required().max(20).min(1),
});

const addressValidationSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

// Define Joi schema for the User model
const userValidationSchema = Joi.object({
  userId: Joi.number().integer().required(),
  userName: Joi.string().required().trim().max(20).min(1),
  password: Joi.string().required().max(20),
  fullName: userFullNameValidationSchema.required(),
  age: Joi.number().integer().required(),
  email: Joi.string().email().required(),
  isActive: Joi.boolean().required(),
  hobbies: Joi.array().items(Joi.string()).required(),
  address: addressValidationSchema.required(),
  orders: Joi.array(),
  isDeleted: Joi.boolean(),
});

export default userValidationSchema;
