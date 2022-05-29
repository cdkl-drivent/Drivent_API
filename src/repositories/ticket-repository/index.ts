import { prisma } from '@/config';

async function find() {
  return prisma.ticket.findMany();
}

const ticketRepository = {
  find,
};

export default ticketRepository;
