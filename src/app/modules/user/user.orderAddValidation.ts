import Joi from 'joi';
import { TOrder } from './user.interface';

const orderValidationSchema = Joi.object<TOrder>({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

export { orderValidationSchema };
