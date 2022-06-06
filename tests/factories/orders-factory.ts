import { Order } from '@prisma/client';
import { prisma } from '@/config';

type OrderParams = Omit<Order, 'id' | 'Payment'>;

export async function createOrder(order: OrderParams) {
  return prisma.order.create({
    data: order,
  });
}
