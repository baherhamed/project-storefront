import Client from '../database';

export class DashboardQueries {
  // Get all products that have been included in orders
  async productsInOrders(): Promise<
    { name: string; price: number; order_id: string }[]
  > {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id = order_products.id';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }
}

export class UsersOrdersQueries {
  // Get all products that have been included in orders
  async usersOrders(): Promise<{ name: string }[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT username,status FROM users INNER JOIN orders ON users.id = orders.user_id';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get users orders: ${err}`);
    }
  }
}

export class ExpensiveProductsQueries {
  // Get all products that have been included in orders
  async expensiveProducts(): Promise<{ name: string }[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT name,price FROM products ORDER BY price DESC LIMIT  2';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get users product price: ${err}`);
    }
  }
}
// DESC
// ASC ;
