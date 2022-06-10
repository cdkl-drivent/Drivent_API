import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';

export let prisma: PrismaClient;
export const redis = createClient();

export async function connectDb(): Promise<void> {
  prisma = new PrismaClient();

  await redis.connect();
  await redis.select(JSON.parse(process.env.REDIS_DATABASE));
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
  await redis.disconnect();
}
