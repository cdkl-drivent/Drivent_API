import { Accomodation } from '@prisma/client';
import { prisma } from '@/config';

export function createAccomodation(): Promise<Accomodation> {
  return prisma.accomodation.create({
    data: {
      type: 'Com Hotel',
      price: 35000,
    },
  });
}
