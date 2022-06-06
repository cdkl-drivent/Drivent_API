import { AuthenticatedRequest } from '@/middlewares';
import ordersService from '@/services/orders-service';
import { Response } from 'express';
import httpStatus from 'http-status';
import { orderParams } from '@/repositories/order-repository';

export async function create(req: AuthenticatedRequest, res: Response) {
  const newOrder: orderParams = req.body;

  const createdOrder = await ordersService.create({ ...newOrder, userId: req.userId });

  return res.status(httpStatus.OK).send(createdOrder);
}

export async function getByUserId(req: AuthenticatedRequest, res: Response) {
  const order = await ordersService.getByUserId(req.userId);

  return res.status(httpStatus.OK).send(order);
}

export async function updatePayment(req: AuthenticatedRequest, res: Response) {
  await ordersService.updatePayment({
    userId: req.userId,
  });

  return res.sendStatus(httpStatus.OK);
}
