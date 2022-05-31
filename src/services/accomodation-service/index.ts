import { notFoundError } from '@/errors';
import accomodationRepository from '@/repositories/accomodation-repository';

async function findAll() {
  const accomodations = await accomodationRepository.findAll();
  if (accomodations.length === 0) throw notFoundError();
  return accomodations;
}

const accomodationService = { findAll };
export default accomodationService;
