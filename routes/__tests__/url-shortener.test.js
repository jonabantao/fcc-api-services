const request = require('supertest');
const app = require('../../config/app');

describe('POST /api/url/new/', () => {
  test('should return error message for incorrect URL format', () => {
    const errorMsg = { message: 'Incorrect format. Please use a valid protocol and website.' };
    const postData = { originalUrl: 'whatisthis' };

    return request(app).post('/api/url/new/')
      .send(postData)
      .then((res) => {
        expect(res.statusCode).toBe(422);
        expect(res.body).toMatchObject(errorMsg);
      });
  });

  test('should return the long and short url for valid URLs', () => {
    const originalUrl = 'https://www.google.com/';
    const postData = { originalUrl };
    const validRes = {
      originalUrl,
      shortUrl: expect.any(String),
    };

    return request(app).post('/api/url/new/')
      .send(postData)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject(validRes);
        expect(res.body.shortUrl).toHaveLength(7);
      });
  });
});
