import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

import { createUser } from './factories';
import { createSession } from './factories/sessions-factory';
import { prisma } from '@/config';

export async function cleanDb() {
  await prisma.order.deleteMany({});
  await prisma.accomodation.deleteMany({});
  await prisma.ticket.deleteMany({});
  await prisma.address.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
}

export async function generateValidToken(user?: User) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  const session = await createSession(token, user);
  console.log(session);
  return token;
}
