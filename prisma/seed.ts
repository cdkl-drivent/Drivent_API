import { PrismaClient, Ticket, Accomodation } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

async function main() {
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

  await prisma.ticket.createMany({
    data: tickets,
  });

  await prisma.accomodation.createMany({
    data: accomodations,
  });

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

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
