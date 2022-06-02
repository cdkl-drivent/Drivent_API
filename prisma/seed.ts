import { PrismaClient, Ticket } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

async function main() {
  let event = await createEvent();
  console.log({ event });

  await createTickets();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

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

  await prisma.ticket.createMany({
    data: tickets,
  });
}

async function createEvent() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }
  return event;
}

