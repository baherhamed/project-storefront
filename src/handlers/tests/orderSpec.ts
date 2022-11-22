import appServer from '../../server';
import request from 'supertest';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJ1c2VybmFtZSI6ImJhaGVyIn0sImlhdCI6MTY2OTE0ODYwNywiZXhwIjoxNjY5NzUzNDA3fQ.3sOM1F7R3iV7E6Be6fmg0a3GnPd8-UOv1jr3K7tjawc';

describe('test orders handlers', async () => {
  it('get orders', async function () {
    const response = await request(appServer)
      .get('/orders/get')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('get all orders with auth', async () => {
    const response = await request(appServer)
      .get('/orders/get')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response).toEqual(jasmine.any(Object));
  });
});
