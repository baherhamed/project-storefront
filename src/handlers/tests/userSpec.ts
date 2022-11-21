import appServer from '../../server';
import request from 'supertest';

describe('test server', async () => {
  it('check if server is up', async function () {
    const response = await request(appServer).get('/');
    expect(response.status).toBe(200);
  });

  it('authenticate user status', async function () {
    const response = await request(appServer).post('/users/authenticate');
    expect(response.status).toBe(400);
  });

  it('get token', async function () {
    const authUser = {
      username: 'baher',
      password: 'password',
    };

    const response = await request(appServer)
      .post('/users/authenticate')
      .send(authUser);
    expect(response.body).toBeDefined();
  });

  it('add new user if user not exisit ', async function () {
    const newUser = {
      firstname: 'user first name',
      lastname: 'user last name',
      username: 'username1',
      password: 'password1',
    };
    const response = await request(appServer).post('/users/add').send(newUser);
    expect(response.status).toBe(400);
  });

  it('add new user if user aleady exisit', async function () {
    const newUser = {
      firstname: 'user firstname',
      lastname: 'user last name',
      username: 'username',
      password: 'password',
    };
    const response = await request(appServer).post('/users/add').send(newUser);

    expect(response.body).toBeDefined();
    expect(response.status).toBe(400);
    expect(response.body).toEqual(jasmine.any(Object));
  });

  it('add new user with wrong route', async function () {
    const newUser = {
      firstname: 'user firstname',
      lastname: 'user last name',
      username: 'username',
      password: 'password',
    };
    const response = await request(appServer)
      .post('/users/adduser')
      .send(newUser);
    expect(response.status).toBe(404);
  });
});
