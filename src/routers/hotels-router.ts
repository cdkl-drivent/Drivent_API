import { Router } from 'express';
import { getDefaultEvent } from '@/controllers';

const hotelsRouter = Router();

hotelsRouter.get('/', getDefaultEvent);

export { hotelsRouter };