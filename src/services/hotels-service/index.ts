import { notFoundError } from '@/errors';
import hotelsRepository from '@/repositories/hotels-repository';

async function findAll() {
  const hotels = await hotelsRepository.findAll();
  if (hotels.length === 0) throw notFoundError();
  return hotels;
}

const hotelsService = { findAll };
export default hotelsService;