import { createClient } from 'redis';
import { PrismaClient, Ticket, Accomodation, Hotel } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();
const redis = createClient();

async function main() {

  await redis.connect();
  await redis.select(JSON.parse(process.env.REDIS_DATABASE));

  const hotels = await createHotels()
  console.log({ hotels });
  
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

async function createHotels() {
  const hotels: Hotel[] = [
    {
      id: 4,
      name: 'Driven Resort+',
      roomTypes: 'Single e Double',
      availableBeds: 103,
      image: 'https://cf.bstatic.com/xdata/images/hotel/max500/306975513.jpg?k=9c52d622e82d35ccaa4f8078009b98e707e0234e49b1be2c52704267b01ae14a&o=&hp=1'
    },
    {
      id: 5,
      name: 'Driven Palace II',
      roomTypes: 'Single e Double',
      availableBeds: 103,
      image: 'https://pix10.agoda.net/hotelImages/338450/-1/83ae032f69728b5b19b86278fe934ec5.jpg?ca=9&ce=1&s=1024x768'
    },
    {
      id: 6,
      name: 'Driven World - Natal',
      roomTypes: 'Single e Double',
      availableBeds: 103,
      image: 'https://pix10.agoda.net/hotelImages/154/154984/154984_16041514250041540113.jpg?ca=6&ce=1&s=1024x768'
    },
  ];

  return await prisma.hotel.createMany({
    data: hotels,
  });
}





