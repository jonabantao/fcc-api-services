const request = require('supertest');
const app = require('../../config/app');

describe('GET /api/whoami', () => {
  test('should return the proper keys', () => (
    request(app).get('/api/whoami/').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        ipaddress: expect.any(String),
        language: expect.any(String),
        software: expect.any(String),
      });
    })
  ));
});
