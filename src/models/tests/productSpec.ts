import { Product, ProductStore } from '../product';
import { User, userSchmea } from '../user';

const productModel = new ProductStore();
const userModel = new userSchmea();

describe('test product model', () => {
  beforeAll(async () => {
    const userData: User = {
      firstname: 'baher',
      lastname: 'hamed',
      username: 'baher',
      password: 'password',
    };
    await userModel.create(userData);

    const productData: Product = {
      name: 'product 1',
      price: 30,
      category: 'laptop',
      popular_rate: 3,
    };
    await productModel.create(productData);
  });

  it('should have index method', async () => {
    expect(productModel.index).toBeDefined();
  });

  it('index method should return data with type array', async () => {
    const products = await productModel.index();
    expect(products).toEqual(jasmine.any(Array));
  });

  it('should have create method', async () => {
    expect(productModel.create).toBeDefined();
  });

  it('show method should return null if Product exisit', async () => {
    const productData: Product = {
      name: 'product 12',
      price: 30,
      category: 'laptop',
      popular_rate: 3,
    };
    const newProduct = await productModel.create(productData);

    expect(newProduct).toEqual(null);
  });

  it('show method should return null if Product not exisit', async () => {
    const productData: Product = {
      name: String(Date.now()),
      price: 30,
      category: 'laptop',
      popular_rate: 3,
    };
    const newProduct = await productModel.create(productData);

    expect(newProduct).toEqual(jasmine.any(Object));
  });

  it('should have update method', async () => {
    expect(productModel.update).toBeDefined();
  });

  it('update method should return data with type Product', async () => {
    const productData = {
      id: 1,
      name: 'updated product 3',
      price: 30,
      category: 'laptop',
      popular_rate: 3,
    };
    const updateProduct = await productModel.update(productData);
    expect(updateProduct).toEqual(jasmine.any(Object));
  });
});
