import { prisma } from '@/config';
import { Order } from '@prisma/client';

export type orderParams = Omit<Order, 'id' | 'payment'>;

async function updatePayment(userId: number) {
  return prisma.order.update({
    where: { userId },
    data: { Payment: true },
  });
}

async function create(order: orderParams) {
  return prisma.order.create({
    data: order,
  });
}

async function getByUserId(userId: number) {
  return prisma.order.findUnique({
    where: { userId },
    include: { Ticket: true, Accomodation: true },
  });
}

const orderRepository = {
  updatePayment,
  getByUserId,
  create,
};

export default orderRepository;
