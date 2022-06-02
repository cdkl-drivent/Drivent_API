import accomodationService from '@/services/accomodation-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getAccomodationTypes(_req: Request, res: Response) {
  const accomodations = await accomodationService.findAll();

  return res.status(httpStatus.OK).send(accomodations);
}
