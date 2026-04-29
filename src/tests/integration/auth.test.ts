import request from 'supertest';
import app from '../../app';
import prisma from '../../lib/prisma';
import { cleanupDatabase } from '../helpers/dbCleanup';


describe('Auth API', () => {
 
  beforeEach(async () => {
    await cleanupDatabase();
  });

  describe('POST /auth/register', () => {
    it('should register a new user and return 201', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@test.com',
          username: 'john',
          password: '123456'
        });

      expect(res.status).toBe(201);
      expect(res.body.user).toHaveProperty('id');
      expect(res.body.user.email).toBe('test@test.com');
      expect(res.body.token).toBeDefined();
    });

    it('should return 400 if email already exists', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@test.com',
          username: 'john',
          password: '123456'
        });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@test.com',
          username: 'john',
          password: '123456'
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('email already');
    });

    it('should return 400 if missing fields', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@test.com' });

      expect(res.status).toBe(400);
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@test.com',
          username: 'john',
          password: '123456'
        });
    });

    it('should login and return token', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@test.com',
          password: '123456'
        });

      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
    });

    it('should return 401 if wrong password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@test.com',
          password: 'wrongpassword'
        });

      expect(res.status).toBe(401);
    });

    it('should return 401 if user not found', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@test.com',
          password: '123456'
        });

      expect(res.status).toBe(401);
    });
  });
});