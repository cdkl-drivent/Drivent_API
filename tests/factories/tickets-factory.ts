import { Ticket } from '@prisma/client';
import { prisma } from '@/config';
import faker from '@faker-js/faker';

export function createTicket(): Promise<Ticket> {
  return prisma.ticket.create({
    data: {
      type: faker.random.word(),
      price: faker.datatype.number(),
    },
  });
}
