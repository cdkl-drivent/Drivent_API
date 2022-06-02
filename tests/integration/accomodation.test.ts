import app, { init } from '@/app';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import * as jwt from 'jsonwebtoken';
import { createAccomodation } from '../factories/accomodations-factory';
import { cleanDb, generateValidToken } from '../helpers';
import { createUser } from '../factories';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('GET /accomodations', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/accomodations');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/accomodations').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/accomodations').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 404 if there is no ticket', async () => {
      const token = await generateValidToken();
      const response = await server.get('/accomodations').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it('should respond with status 200 and ticket data if there is a ticket', async () => {
      const accomodation = await createAccomodation();

      const token = await generateValidToken();
      const response = await server.get('/accomodations').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([
        {
          type: accomodation.type,
          price: accomodation.price,
        },
      ]);
    });
  });
});
