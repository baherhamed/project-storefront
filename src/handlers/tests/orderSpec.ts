import appServer from '../../server';
import request from 'supertest';
import { Order } from '../../models/order';
import userSchmea, { User } from '../../models/user';
const userModel = new userSchmea();
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJ1c2VybmFtZSI6ImJhaGVyIn0sImlhdCI6MTY2OTE0ODYwNywiZXhwIjoxNjY5NzUzNDA3fQ.3sOM1F7R3iV7E6Be6fmg0a3GnPd8-UOv1jr3K7tjawc';

describe('test orders handlers', async () => {
  beforeAll(async () => {
    const userData: User = {
      firstname: 'baher',
      lastname: 'hamed',
      username: 'baher',
      password: 'password',
    };
    await userModel.create(userData);
  });

  it('get orders', async function () {
    const response = await request(appServer)
      .get('/orders/get')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('add order with auth', async () => {
    const orderData: Order = {
      status: 'active',
      user_id: 1,
      productsList: [
        { product_id: 1, quantity: 1 },
        { product_id: 2, quantity: 2 },
      ],
    };
    const response = await request(appServer)
      .post('/orders/add')
      .set('Authorization', `Bearer ${token}`)
      .send(orderData);

    expect(response).toEqual(jasmine.any(Object));
  });
});
