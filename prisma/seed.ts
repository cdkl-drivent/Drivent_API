import { PrismaClient, Ticket, Accomodation, Hotel } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

async function main() {
  const hotels = await createHotels()
  console.log({ hotels });
  
  const event = await createEvent();
  console.log({ event });

  const tickets = await createTickets();
  console.log({ tickets });

  const accomodations = await createAccomodations()
  console.log({ accomodations });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
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

async function create() {
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





