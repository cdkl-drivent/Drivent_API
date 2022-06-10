import { notFoundError } from '@/errors';
import orderRepository, { orderParams } from '@/repositories/order-repository';

type userId = {
  userId: number;
};

async function updatePayment({ userId }: userId) {
  const order = await orderRepository.getByUserId(userId);

  if (!order) throw notFoundError();

  await orderRepository.updatePayment(userId);

  return;
}

async function getByUserId(userId: number) {
  const order = await orderRepository.getByUserId(userId);

  if (!order) throw notFoundError();

  return order;
}

async function createOrUpdate(newOrder: orderParams) {
  const createdOrder = await orderRepository.createOrUpdate(newOrder);

  return createdOrder;
}
const ordersService = {
  getByUserId,
  createOrUpdate,
  updatePayment,
};

export default ordersService;
