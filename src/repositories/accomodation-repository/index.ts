import { prisma } from '@/config';

async function findAll() {
  return await prisma.accomodation.findMany();
}

const accomodationRepository = {
  findAll,
};

export default accomodationRepository;
