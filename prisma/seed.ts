import { PrismaClient, Ticket, Accomodation } from '@prisma/client';
import { createClient } from 'redis';
import dayjs from 'dayjs';

const prisma = new PrismaClient();
const redis = createClient();

async function cleanDb() {
  await prisma.order.deleteMany({});
  await prisma.accomodation.deleteMany({});
  await prisma.ticket.deleteMany({});
  await prisma.address.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
  await redis.flushDb();
}

async function main() {
  await redis.connect();
  await redis.select(JSON.parse(process.env.REDIS_DATABASE));
  // await cleanDb();

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

  return await prisma.accomodation.createMany({
    data: accomodations,
  });
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

  return await prisma.ticket.createMany({
    data: tickets,
  });
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
