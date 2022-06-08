import { Order } from '@prisma/client';
import { prisma } from '@/config';
import { createTicket } from './tickets-factory';
import { createAccomodation } from './accomodations-factory';
import faker from '@faker-js/faker';

type OrderParams = Omit<Order, 'id' | 'Payment'>;

export async function createOrder(order: OrderParams) {
  return prisma.order.create({
    data: order,
  });
}

export async function generateOrderBody(userId?: number) {
  const ticket = await createTicket();
  const accomodation = await createAccomodation();
  const price = ticket.price + accomodation.price;

  return {
    userId,
    ticketType: ticket.type,
    accomodationType: accomodation.type,
    price,
  };
}

export async function generateNotValidOrderBody() {
  return {
    ticketType: [faker.random.word()],
    accomodationType: [faker.random.word()],
    price: faker.random.word(),
  };
}
