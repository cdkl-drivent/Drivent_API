import accomodationRepository from '@/repositories/accomodation-repository';

async function findAll() {
  const accomodations = await accomodationRepository.findAll();
  return accomodations;
}

const accomodationService = { findAll };
export default accomodationService;
