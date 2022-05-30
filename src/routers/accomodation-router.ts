import { Router } from 'express';
import { getAccomodationTypes } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const accomodationRouter = Router();

accomodationRouter.all('/*', authenticateToken).get('/', getAccommodationTypes);

export { accomodationRouter };
