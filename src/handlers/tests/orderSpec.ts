import appServer from '../../server';
import request from 'supertest';

describe('test orders handlers', async () => {
  it('get orders', async function () {
    const response = await request(appServer).get('/orders/get');
    expect(response.status).toBe(200);
  });

  it('get all orders', async () => {
    const response = await request(appServer).get('/orders/get');
    expect(response.status).toBe(200);
    expect(response).toEqual(jasmine.any(Object));
  });
});
