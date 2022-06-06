import { AuthenticatedRequest } from '@/middlewares';
import ordersService from '@/services/orders-service';
import { Response } from 'express';
import httpStatus from 'http-status';
import { Order } from '@prisma/client';

type NewOrder = Omit<Order, 'id' | 'Payment' | 'userId'>;

export async function createOrUpdate(req: AuthenticatedRequest, res: Response) {
  const newOrder: NewOrder = req.body;

  const createdOrder = await ordersService.createOrUpdate({ ...newOrder, userId: req.userId });

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
