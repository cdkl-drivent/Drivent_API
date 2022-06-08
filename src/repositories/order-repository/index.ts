import { prisma } from '@/config';
import { Order } from '@prisma/client';

export type orderParams = Omit<Order, 'id' | 'Payment'>;

async function updatePayment(userId: number) {
  return prisma.order.update({
    where: { userId },
    data: { Payment: true },
  });
}

async function createOrUpdate(order: orderParams) {
  return prisma.order.upsert({
    where: { userId: order.userId },
    create: order,
    update: order,
  });
}

async function getByUserId(userId: number) {
  return prisma.order.findUnique({
    where: { userId },
  });
}

const orderRepository = {
  updatePayment,
  getByUserId,
  createOrUpdate,
};

export default orderRepository;
