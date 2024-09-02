const request = require("supertest");
const app = require("../apps/app");
const { sequelize, User } = require("../apps/models");

describe('POST /register', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        email: 'regis_user@gmail.com',
        password: 'password123'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe("regis_user@gmail.com");
  });

});
