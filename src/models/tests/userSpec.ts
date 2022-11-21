import { User, userSchmea } from '../user';

const userModel = new userSchmea();

describe('test user model', () => {
  it('should have index method', async () => {
    expect(userModel.index).toBeDefined();
  });

  it('index method should return data with type array', async () => {
    const users = await userModel.index();
    expect(users).toEqual(jasmine.any(Array));
  });

  it('should have create method', async () => {
    expect(userModel.create).toBeDefined();
  });

  it('create method should return data with type user', async () => {
    const userData: User = {
      firstname: 'baher ha',
      lastname: 'hussein',
      username: 'baherhamedhussein',
      password: 'password',
    };
    const newUser = await userModel.create(userData);
    expect(newUser).toEqual(jasmine.any(Object));
  });

  it('should have update method', async () => {
    expect(userModel.update).toBeDefined();
  });

  it('update method should return data with type user', async () => {
    const userData = {
      id: 5,
      firstname: 'updated baher user',
      lastname: 'hussein',
      username: 'baherhamedhussein',
      password: 'password1',
    };
    const updateUser = await userModel.update(userData);
    expect(updateUser).toEqual(jasmine.any(Object));
  });
});
