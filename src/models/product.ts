// @ts-ignore
import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
  popular_rate: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const validateTableExisit =
        'CREATE TABLE IF NOT EXISTS products(id SERIAL PRIMARY KEY,name VARCHAR(64) NOT NULL,price integer NOT NULL,category VARCHAR(64),popular_rate integer)';
      await conn.query(validateTableExisit);

      const sql = 'SELECT name,price,category,popular_rate FROM products ';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Can't get products error is: ${error}`);
    }
  }

  async show(id: string): Promise<Product | null> {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT name,price,category,popular_rate FROM products WHERE id=($1)';
      const result = await conn.query(sql, [parseInt(id)]);
      conn.release();
      if (result.rows.length) {
        return result.rows[0];
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Can't get product with ${id} ${error}`);
    }
  }

  async productCategory(category: string): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT name,price,category,popular_rate FROM products WHERE category=($1)';
      const result = await conn.query(sql, [category]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't get product with category ${category} ${error}`);
    }
  }

  async popularProduct(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT name,price,category,popular_rate FROM products ORDER BY popular_rate DESC ';
      const result = await conn.query(sql);

      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Can't get product with popular ${error}`);
    }
  }

  async create(a: Product): Promise<Product | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT name FROM products WHERE name=($1)';

      const productExisit = await conn.query(sql, [a.name]);

      if (productExisit.rows[0]) {
        conn.release();
        return null;
      }

      try {
        const conn = await Client.connect();
        const sql =
          'INSERT INTO products(name,price,category,popular_rate) VALUES ($1,$2,$3,$4) RETURNING name,price,category,popular_rate';
        const result = await conn.query(sql, [
          a.name,
          a.price,
          a.category,
          a.popular_rate,
        ]);
        conn.release();
        const product = result.rows[0];
        return product;
      } catch (error) {
        throw new Error(`Can't create product error is:  ${error}`);
      }
    } catch (error) {
      throw new Error(`error while add new product is:  ${error}`);
    }
  }

  async update(a: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql =
        'UPDATE products SET (name,price,category,popular_rate ) = ($2,$3,$4,$5) WHERE id=($1) RETURNING name,price,category,popular_rate';
      const result = await conn.query(sql, [
        a.id,
        a.name,
        a.price,
        a.category,
        a.popular_rate,
      ]);

      conn.release();
      const product = result.rows[0];
      return product;
    } catch (error) {
      throw new Error(`Can't update product error is:  ${error}`);
    }
  }

  async delete(a: string): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM products WHERE id=($1)';
      const result = await conn.query(sql, [a]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (error) {
      throw new Error(`Can't delete product error is:  ${error}`);
    }
  }
}
