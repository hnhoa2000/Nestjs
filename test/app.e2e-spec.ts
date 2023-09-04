import { config } from 'dotenv';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import mongoose from 'mongoose';
import { MongoClient } from 'mongodb'; // Import MongoClient từ mongodb

config({ path: '.env.test' });

describe('Test (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(async () => {
    // Xóa cơ sở dữ liệu nếu nó đã tồn tại trước khi kết nối
    const mongoClient = await MongoClient.connect(process.env.MONGODB_URI);
    await mongoClient.db(process.env.DB_NAME).dropDatabase();
    mongoClient.close();

    // Kết nối với cơ sở dữ liệu
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await app.close();
  });

  let accessToken = '';
  describe('Auth Controller', () => {
    const user = {
      email: "hnh11@gmail.com",
      password: "123"
    }
    const CREATE_USER_URL = '/auth/register';
    it('(POST) /auth/register - create new user', async () => {
      const res = await request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send(user)
        .expect(201);
      expect(res.body.accessToken).toBeDefined();
    });

    const LOGIN_URL = '/auth/login';
    it('(POST) /auth/login - Login', async () => {
      const res = await request(app.getHttpServer())
        .post(LOGIN_URL)
        .send(user)
        .expect(201);
      expect(res.body.accessToken).toBeDefined();
      accessToken = res.body.accessToken;
    });
  })

  describe('User Controller', () => {
    const USER_PROFILE_URL = '/user/profile';
    it('(GET) /user/profile - get info user', async () => {
      const res = await request(app.getHttpServer())
        .get(USER_PROFILE_URL)
        .set('Authorization', 'Bearer ' + accessToken)
        .expect(200);
      expect(res.body.email).toBeDefined();
    });
  })
});
