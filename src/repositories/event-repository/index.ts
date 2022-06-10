import { redis } from '@/config';

async function findFirst() {
  const event = await redis.hGetAll('event');

  return event;
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
