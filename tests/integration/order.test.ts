import app, { init } from '@/app';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import * as jwt from 'jsonwebtoken';
import { createOrder, generateNotValidOrderBody, generateOrderBody } from '../factories/orders-factory';
import { cleanDb, generateValidToken } from '../helpers';
import { createTicket } from '../factories/tickets-factory';
import { createAccomodation } from '../factories/accomodations-factory';
import { createUser } from '../factories';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('GET /orders', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/orders');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/orders').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/orders').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 404 if there is no order', async () => {
      const token = await generateValidToken();
      const response = await server.get('/orders').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it('should respond with status 200 and order data if there is a order', async () => {
      const user = await createUser({ password: faker.internet.password(6) });
      const orderBody = await generateOrderBody(user.id);
      const order = await createOrder(orderBody);
      const token = await generateValidToken(user);

      const response = await server.get('/orders').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(order);
    });
  });
});

describe('PUT /orders', () => {
  it('should respond with status 404 if there is no order', async () => {
    const token = await generateValidToken();
    const response = await server.put('/orders').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it('should respond with status 200 if the order has been updated', async () => {
    const user = await createUser({ password: faker.internet.password(6) });
    const orderBody = await generateOrderBody(user.id);
    const token = await generateValidToken(user);

    await createOrder(orderBody);

    const response = await server.put('/orders').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
  });
});

describe('POST /orders', () => {
  it('should respond with status 400 if order body is not valid', async () => {
    const user = await createUser({ password: faker.internet.password(6) });
    const body = await generateNotValidOrderBody();
    const token = await generateValidToken(user);

    const response = await server.post('/orders').send(body).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 200 if the order has been created', async () => {
    const user = await createUser({ password: faker.internet.password(6) });
    const body = await generateOrderBody(user.id);
    delete body.userId;
    const token = await generateValidToken(user);

    const response = await server.post('/orders').send(body).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
  });
});
