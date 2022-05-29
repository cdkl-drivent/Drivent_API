import ticketsService from '@/services/tickets-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getTicketTypes(_req: Request, res: Response) {
  const tickets = await ticketsService.getTicketTypes();

  return res.status(httpStatus.OK).send(tickets);
}
