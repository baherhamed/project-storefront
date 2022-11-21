import { Order, OrderStore } from '../order';

const orderModel = new OrderStore();

describe('test order model', () => {
  it('should have index method', async () => {
    expect(orderModel.index).toBeDefined();
  });

  it('index method should return data with type array', async () => {
    const order_products = await orderModel.index();
    expect(order_products).toEqual(jasmine.any(Array));
  });

  it('should have create method', async () => {
    expect(orderModel.create).toBeDefined();
  });

  it('show method should return data with type Order', async () => {
    const orderData: Order = {
      id: '3',
      status: 'active',
      user_id: 2,
      productsList: [
        { product_id: '1', quantity: 1 },
        { product_id: '2', quantity: 2 },
      ],
    };
    const newOrder = await orderModel.create(orderData);
    expect(newOrder).toEqual(jasmine.any(Object));
  });

  it('should have update method', async () => {
    expect(orderModel.update).toBeDefined();
  });

  it('update method should return data with type Order', async () => {
    const orderData = {
      id: '4',
      status: 'active',
      user_id: 2,
      productsList: [
        { product_id: '1', quantity: 1 },
        { product_id: '2', quantity: 2 },
        { product_id: '3', quantity: 3 },
      ],
    };
    const updateOrder = await orderModel.update(orderData);
    expect(updateOrder).toEqual('Order update');
  });

  it('should have close order  method', async () => {
    expect(orderModel.closeOrdercomplete).toBeDefined();
  });

  it('close order method should return data with type string', async () => {
    const closedOrder = await orderModel.closeOrdercomplete('2');
    expect(closedOrder).toEqual('Order Completed');
  });
});
