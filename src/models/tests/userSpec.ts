import { User, userSchmea } from '../user';

const userModel = new userSchmea();

describe('test user model', () => {
  beforeAll(async () => {
    const userData: User = {
      firstname: 'baher',
      lastname: 'hamed',
      username: 'baher',
      password: 'password',
    };
    await userModel.create(userData);
  });

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

  it('create method should return null if user exisit', async () => {
    const userData: User = {
      firstname: 'baher ha',
      lastname: 'hussein',
      username: 'baherhamedhussein',
      password: 'password',
    };
    const newUser = await userModel.create(userData);
    expect(newUser).toEqual(null);
  });

  it('create method should return data with type user if user not exisit', async () => {
    const userData: User = {
      firstname: 'baher ha',
      lastname: 'hussein',
      username: String(Date.now()),
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
      id: 2,
      firstname: 'updated baher user',
      lastname: 'hussein',
      username: 'baherhamedhussein',
      password: 'password1',
    };
    const updateUser = await userModel.update(userData);
    expect(updateUser).toEqual(jasmine.any(Object));
  });
});
