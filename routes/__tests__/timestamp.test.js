const request = require('supertest');
const app = require('../../config/app');

describe('GET /api/time/:timeString', () => {
  test('should correctly return unix time and natural time for natural date', () => {
    const route = 'Jan%20%2018';
    const expectedBody = {
      unix: 1516262400,
      natural: 'January 18th 2018',
    };

    return request(app).get(`/api/time/${route}`).then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedBody);
    });
  });

  test('should correctly return unix time and natural time for unix time', () => {
    const route = '1525207715';
    const expectedBody = {
      unix: 1525207715,
      natural: 'May 1st 2018',
    };

    return request(app).get(`/api/time/${route}`).then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedBody);
    });
  });

  test('should return null values for unparsable times', () => {
    const route = 'thisisntarealtime';
    const expectedBody = {
      unix: null,
      natural: null,
    };

    return request(app).get(`/api/time/${route}`).then((response) => {
      expect(response.statusCode).toBe(422);
      expect(response.body).toEqual(expectedBody);
    });
  });
});
