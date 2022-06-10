import hotelService from '@/services/hotels-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getHotels(_req: Request, res: Response) {
  const hotels = await hotelService.findAll();

  return res.status(httpStatus.OK).send(hotels);
}