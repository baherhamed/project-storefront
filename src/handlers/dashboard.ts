import express, { Request, Response } from 'express';

import {
  DashboardQueries,
  UsersOrdersQueries,
  ExpensiveProductsQueries,
} from '../services/dashboard';

const dashboardRoutes = (app: express.Application) => {
  app.get('/products_in_orders', productsInOrders);
  app.get('/users_orders', userOrders);
  app.get('/expensive_products', expensiveProducts);
};

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.productsInOrders();
    res.json(products);
  } catch (error) {
    res.status(400);
    res.send(`error while get  order prodcuts ${error}`);
  }
};

const usersOrders = new UsersOrdersQueries();

const userOrders = async (_req: Request, res: Response) => {
  try {
    const users = await usersOrders.usersOrders();
    res.json(users);
  } catch (error) {
    res.status(400);
    res.send(`error while get  user orders ${error}`);
  }
};
const expensiveProduct = new ExpensiveProductsQueries();

const expensiveProducts = async (_req: Request, res: Response) => {
  try {
    const products = await expensiveProduct.expensiveProducts();
    res.json(products);
  } catch (error) {
    res.status(400);
    res.send(`error while get  expesive products ${error}`);
  }
};

export default dashboardRoutes;
