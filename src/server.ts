import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
require('dotenv').config('../.env');

import users_routes from './handlers/user';
import orders_routes from './handlers/orders';
import products_routes from './handlers/product';
import dashboard_routes from './handlers/dashboard';
 
const PORT = process.env.PORT || 3000;
const app = express();
const address: string = `${process.env.HOST}': ${PORT}`;

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('server Working');
});

users_routes(app);
orders_routes(app);
products_routes(app);

dashboard_routes(app);

app.listen(PORT, function () {
  console.log(`starting app on: ${address}`);
});
