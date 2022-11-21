import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();

const { HOST, DATABASE, DATABASE_TEST, USER, PASSWORD, ENV } = process.env;

let Client = new Pool();

if (ENV === 'test') {
  Client = new Pool({
    host: HOST,
    database: DATABASE_TEST,
    user: USER,
    password: PASSWORD,
  });
}

if (ENV === 'DEV') {
  Client = new Pool({
    host: HOST,
    database: DATABASE,
    user: USER,
    password: PASSWORD,
  });
}

export default Client;
