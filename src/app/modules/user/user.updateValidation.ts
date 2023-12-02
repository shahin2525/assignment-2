import Joi from 'joi';
import { TAddress, TOrder, TUserFullName } from './user.interface';
// import { TAddress, TOrder, TUserFullName } from './user/user.interface';

const addressSchema = Joi.object<TAddress>({
  street: Joi.string().optional(),
  city: Joi.string().optional(),
  country: Joi.string().optional(),
});

const orderSchema = Joi.object<TOrder>({
  productName: Joi.string().optional(),
  price: Joi.number().optional(),
  quantity: Joi.number().optional(),
});

const userFullNameSchema = Joi.object<TUserFullName>({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
});

const userUpdateValidationSchema = Joi.object({
  userId: Joi.number().optional(),
  userName: Joi.string().optional().max(20),
  password: Joi.string().optional(),
  fullName: userFullNameSchema.optional(),
  age: Joi.number().optional(),
  email: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
  hobbies: Joi.array().items(Joi.string()).optional(),
  address: addressSchema.optional(),
  orders: Joi.array().items(orderSchema).default([]).optional(),
});

export { userUpdateValidationSchema };
