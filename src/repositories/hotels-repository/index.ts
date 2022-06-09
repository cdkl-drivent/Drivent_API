import { prisma } from '@/config';

async function findAll() {
  return await prisma.hotel.findMany();
}

const hotelRepository = {
  findAll,
};

export default hotelRepository;