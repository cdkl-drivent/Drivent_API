import { Accomodation } from '@prisma/client';
import { prisma } from '@/config';
import faker from '@faker-js/faker';

export function createAccomodation(): Promise<Accomodation> {
  return prisma.accomodation.create({
    data: {
      type: faker.random.word(),
      price: faker.datatype.number(),
    },
  });
}
