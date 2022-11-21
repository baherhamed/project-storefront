import appServer from '../../server';
import request from 'supertest';

describe('test orders handlers', async () => {
  it('get products', async function () {
    const response = await request(appServer).get('/products/get');
    expect(response.status).toBe(200);
  });

  it('show product data if product not exisit', async () => {
    const response = await request(appServer).get('/products/get/2555');
    expect(response.status).toBe(200);
  });

  it('show product data if product  exisit', async () => {
    const response = await request(appServer).get('/products/get/1');
    expect(response.status).toBe(200);
    expect(response).toEqual(jasmine.any(Object));
  });

  it('get all products', async () => {
    const response = await request(appServer).get('/products/get');
    expect(response.status).toBe(200);
    expect(response).toEqual(jasmine.any(Object));
  });
});
