import { Ticket } from '@prisma/client';
import { prisma } from '@/config';

export function createTicket(): Promise<Ticket> {
  return prisma.ticket.create({
    data: {
      type: 'Presencial',
      price: 25000,
    },
  });
}
