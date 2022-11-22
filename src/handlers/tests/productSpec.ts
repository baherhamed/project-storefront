import appServer from '../../server';
import request from 'supertest';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJ1c2VybmFtZSI6ImJhaGVyIn0sImlhdCI6MTY2OTE0ODYwNywiZXhwIjoxNjY5NzUzNDA3fQ.3sOM1F7R3iV7E6Be6fmg0a3GnPd8-UOv1jr3K7tjawc';

describe('test prodcusts handlers', async () => {
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

  it('add new  product', async () => {
    const newProduct = {
      name: String(Date.now()),
      price: 1,
      category: 'category1',
      popular_rate: 3,
    };
    const response = await request(appServer)
      .post('/products/add')
      .send(newProduct)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response).toEqual(jasmine.any(Object));
  });
});
