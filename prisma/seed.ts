import { PrismaClient, Ticket, Accomodation } from '@prisma/client';
import { createClient } from 'redis';
import dayjs from 'dayjs';

const prisma = new PrismaClient();
const redis = createClient();

async function main() {
  await redis.connect();
  await redis.select(JSON.parse(process.env.REDIS_DATABASE));

  const event = await createEvent();
  console.log({ event });

  const tickets = await createTickets();
  console.log({ tickets });

  const accomodations = await createAccomodations();
  console.log({ accomodations });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await redis.disconnect();
  });

async function createAccomodations() {
  const accomodations: Accomodation[] = [
    {
      type: 'Sem Hotel',
      price: 0,
    },
    {
      type: 'Com Hotel',
      price: 35000,
    },
  ];

  for (let i = 0; i < accomodations.length; i++) {
    await prisma.accomodation.upsert({
      where: { type: accomodations[i].type },
      create: accomodations[i],
      update: accomodations[i],
    });
  }

  return await prisma.accomodation.findMany({});
}

async function createTickets() {
  const tickets: Ticket[] = [
    {
      type: 'Presencial',
      price: 25000,
    },
    {
      type: 'Online',
      price: 10000,
    },
  ];

  for (let i = 0; i < tickets.length; i++) {
    await prisma.ticket.upsert({
      where: { type: tickets[i].type },
      create: tickets[i],
      update: tickets[i],
    });
  }

  return await prisma.ticket.findMany({});
}

async function createEvent() {
  await redis.hSet('event', {
    title: 'Driven.t',
    logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
    backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
    startsAt: JSON.stringify(dayjs()),
    endsAt: JSON.stringify(dayjs().add(21, 'days').toDate()),
    createdAt: JSON.stringify(dayjs().toDate()),
    updatedAt: JSON.stringify(dayjs().toDate()),
  });

  const event = await redis.hGetAll('event');

  return event;
}
