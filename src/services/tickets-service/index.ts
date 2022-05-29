import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';
import { Ticket } from '@prisma/client';

async function getTicketTypes(): Promise<Ticket[]> {
  const tickets = await ticketRepository.find();
  if (tickets.length === 0) throw notFoundError();

  return tickets;
}

const ticketsService = {
  getTicketTypes,
};

export default ticketsService;
