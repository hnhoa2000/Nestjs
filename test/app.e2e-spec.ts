import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Creating new user POST /auth/register', () => {
    const CREATE_USER_URL = '/auth/register';
    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({
          email: "hnh@gmail.com",
          password: "123"
        })
        .expect(201);
    });
  })
});
