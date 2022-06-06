import { Router } from 'express';
import * as orderController from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { createOrderSchema } from '@/schemas/orders-schemas';

const ordersRouter = Router();

ordersRouter
  .all('/*', authenticateToken)
  .post('/', validateBody(createOrderSchema), orderController.create)
  .get('/', orderController.getByUserId)
  .put('/', orderController.updatePayment);

export { ordersRouter };
