const request = require('supertest');
const app = require('../../config/app');

describe('GET /api/url/new', () => {
  test('should return error message for incorrect URL format', () => {
    const errorMsg = { message: 'Incorrect format. Please use a valid protocol and website.' };

    return request(app).get('/api/url/new/whatisthis').then((res) => {
      expect(res.statusCode).toBe(422);
      expect(res.body).toMatchObject(errorMsg);
    });
  });

  test('should return the long and short url for valid URLs', () => {
    const URL = 'https://www.google.com/';
    const validRes = {
      original_url: URL,
      short_url: expect.any(String),
    };

    return request(app).get(`/api/url/new/${URL}`).then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toBe(validRes);
    });
  });
});
