import { orderParams } from '@/repositories/order-repository';
import Joi from 'joi';

type createOrder = Omit<orderParams, 'UserId'>;

export const createOrderSchema = Joi.object<createOrder>({
  ticketType: Joi.string().required(),
  accomodationType: Joi.string().required(),
  price: Joi.number().required(),
});
