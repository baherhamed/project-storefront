import bcrypt from 'bcrypt';
import Client from '../database';
import jwt from 'jsonwebtoken';
import { Order } from './order';
require('dotenv').config('../../.env');

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export type User = {
  id?: number;
  firstname?: string;
  lastname?: string;
  username: string;
  password: string;
};

export type SelectedUser = {
  username: string;
  firstname: string;
  lastname: string;
};

export class userSchmea {
  async index(): Promise<SelectedUser[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT username,firstname,lastname FROM users';
      const result = await conn.query(sql);
      const users = result.rows;

      conn.release();
      const usersList: SelectedUser[] = [];
      for await (const usr of users) {
        if (usr) {
          usersList.push({
            firstname: usr.firstname,
            lastname: usr.lastname,
            username: usr.username,
          });
        }
      }
      return usersList;
    } catch (error) {
      throw new Error(`Can't create user error is:  ${error}`);
    }
  }

  async create(u: User): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT username FROM users WHERE username=($1)';

      const userExisit = await conn.query(sql, [u.username]);

      if (userExisit.rows[0]) {
        conn.release();
        return null;
      }

      try {
        const conn = await Client.connect();

        const sql =
          'INSERT INTO  users (firstname,lastname,username,password) VALUES($1,$2,$3,$4) RETURNING firstname,lastname,username';
        const hash = bcrypt.hashSync(
          u.password + pepper,
          parseInt(`${saltRounds}`)
        );

        const result = await conn.query(sql, [
          u.firstname,
          u.lastname,
          u.username,
          hash,
        ]);
        const user = result.rows[0];
        conn.release();
        return user;
      } catch (error) {
        throw new Error(`Can't create user error is:  ${error}`);
      }
    } catch (error) {
      throw new Error(`Can't create user error is:  ${error}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT firstname,lastname,username FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (error) {
      throw new Error(`Can't GET user data is:  ${error}`);
    }
  }

  async update(u: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const getUser = 'SELECT password FROM users WHERE id=($1)';
      const sql =
        'UPDATE users SET (firstname,lastname,username,password) = ($2,$3,$4,$5) WHERE id=($1) RETURNING firstname,lastname,username';
      const selectedUserPassword = await conn.query(getUser, [u.id]);
      let hash;

      if (u.password) {
        hash = bcrypt.hashSync(u.password + pepper, parseInt(`${saltRounds}`));
      } else {
        hash = selectedUserPassword.rows[0].password;
      }

      const result = await conn.query(sql, [
        u.id,
        u.firstname,
        u.lastname,
        u.username,
        hash,
      ]);
      const user = result.rows[0];

      conn.release();
      return user;
    } catch (error) {
      throw new Error(`Can't update user error is:  ${error}`);
    }
  }

  async authenticate(
    username: string,
    password: string
  ): Promise<string | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE username=($1)';

      const result = await conn.query(sql, [username]);
      conn.release();

      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + pepper, user.password)) {
          const token = jwt.sign(
            { user: { id: user.id, username: user.username } },
            `${process.env.TOKEN_SECRET}`,
            {
              expiresIn: '7d',
            }
          );

          return token;
        }
      }

      return null;
    } catch (error) {
      throw new Error(`error while authinticate:  ${error}`);
    }
  }

  async getUserOrders(id: string): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT id,status FROM orders WHERE user_id=($1)';
      const result = await conn.query(sql, [id]);

      conn.release();
      const order = result.rows;
      return order;
    } catch (error) {
      throw new Error(`Can't get order products error is: ${error}`);
    }
  }
}

export default userSchmea;
