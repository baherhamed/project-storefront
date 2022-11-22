// @ts-ignore
import Client from '../database';

export type Order = {
  id?: string;
  status: string;
  user_id: number;
  productsList: orderItem[];
};

export type orderItem = {
  product_id: string;
  quantity: number;
};

export type OrderProduct = {
  id?: string;
  order_id: string;
  product_id: string;
  quantity: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM order_products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Can't get order products error is: ${error}`);
    }
  }

  async create(a: Order): Promise<Order | null> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO orders(status,user_id) VALUES ($1,$2) RETURNING id';
      const result = await conn.query(sql, [a.status, a.user_id]);
      const order = result.rows[0];

      for await (const item of a.productsList) {
        const selectedItem = {
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
        };
        await this.addProduct(selectedItem);
      }

      conn.release();
      return order;
    } catch (error) {
      throw new Error(`Can't create order products error is:  ${error}`);
    }
  }

  async addProduct(a: OrderProduct): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO order_products(order_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING *';
      const result = await conn.query(sql, [
        a.order_id,
        a.product_id,
        a.quantity,
      ]);
      conn.release();
      const order = result.rows[0];
      return order;
    } catch (error) {
      throw new Error(`Can't create order products error is:  ${error}`);
    }
  }

  async update(a: Order): Promise<Order | string> {
    try {
      const conn = await Client.connect();
      const checkOrderStatusSql = 'SELECT * FROM orders WHERE id=($1)';
      const orderStatus = await conn.query(checkOrderStatusSql, [a.id]);
      if (orderStatus.rows[0].status === 'completed') {
        return 'Cannot update Order becuse order status is Completed';
      }

      const orderProductsList =
        'DELETE FROM order_products WHERE order_id=($1)';
      await conn.query(orderProductsList, [a.id]);

      for await (const item of a.productsList) {
        const selectedItem = {
          order_id: String(a.id),
          product_id: item.product_id,
          quantity: item.quantity,
        };
        await this.addProduct(selectedItem);
      }
      conn.release();

      return 'Order update';
    } catch (error) {
      throw new Error(`Can't update order products error is:  ${error}`);
    }
  }

  async closeOrdercomplete(id: string): Promise<string> {
    try {
      const conn = await Client.connect();
      const sql = `UPDATE orders SET status = ($2) WHERE id=($1) RETURNING status`;

      const result = await conn.query(sql, [id, 'completed']);

      conn.release();

      return 'Order Completed';
    } catch (error) {
      throw new Error(`Can't close order  error is:  ${error}`);
    }
  }

  async delete(a: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM order_products WHERE id=($1)';
      const result = await conn.query(sql, [a]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (error) {
      throw new Error(`Can't delete order products error is:  ${error}`);
    }
  }

  async getOrderProducts(id: string): Promise<OrderProduct[]> {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT * FROM products INNER JOIN order_products ON order_id=($1) WHERE product_id=products.id';
      const result = await conn.query(sql, [id]);

      conn.release();
      const order = result.rows;
      return order;
    } catch (error) {
      throw new Error(`Can't get order products error is:  ${error}`);
    }
  }
}

export default OrderStore;
