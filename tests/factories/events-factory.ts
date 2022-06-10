import dayjs from 'dayjs';
import faker from '@faker-js/faker';
import { redis } from '@/config';

export type EventParams = {
  title?: string;
  backgroundImageUrl?: string;
  logoImageUrl?: string;
  startsAt?: string;
  endsAt?: string;
};

export function createEvent(params?: any) {
  // return redis.set(
  //   'event',
  //   JSON.stringify({
  //     title: params.title || JSON.stringify(faker.lorem.sentence()),
  //     backgroundImageUrl: params.backgroundImageUrl || JSON.stringify(faker.image.imageUrl()),
  //     logoImageUrl: params.logoImageUrl || JSON.stringify(faker.image.imageUrl()),
  //     startsAt: params.startsAt || JSON.stringify(dayjs().subtract(1, 'day').toDate()),
  //     endsAt: params.endsAt || JSON.stringify(dayjs().add(5, 'days').toDate()),
  //   }),
  // );
  return redis.hSet('event', {
    title: params.title || JSON.stringify(faker.lorem.sentence()),
    backgroundImageUrl: params.backgroundImageUrl || JSON.stringify(faker.image.imageUrl()),
    logoImageUrl: params.logoImageUrl || JSON.stringify(faker.image.imageUrl()),
    startsAt: params.startsAt || JSON.stringify(dayjs().subtract(1, 'day').toDate()),
    endsAt: params.endsAt || JSON.stringify(dayjs().add(5, 'days').toDate()),
  });
}
