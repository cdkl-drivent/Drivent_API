import { notFoundError } from '@/errors';
import eventRepository from '@/repositories/event-repository';
import dayjs from 'dayjs';

async function getFirstEvent() {
  const event = await eventRepository.findFirst();
  if (!event.title) throw notFoundError();
  delete event.createdAt;
  delete event.updatedAt;

  return event;
}

export type GetFirstEventResult = Omit<Event, 'createdAt' | 'updatedAt'>;

async function isCurrentEventActive(): Promise<boolean> {
  const event = await eventRepository.findFirst();
  if (!event.title) return false;

  const now = dayjs();
  const eventStartsAt = JSON.parse(event.startsAt);
  const eventEndsAt = JSON.parse(event.endsAt);

  return now.isAfter(eventStartsAt) && now.isBefore(eventEndsAt);
}

const eventsService = {
  getFirstEvent,
  isCurrentEventActive,
};

export default eventsService;
