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
  const products = await dashboard.productsInOrders();
  res.json(products);
};

const usersOrders = new UsersOrdersQueries();

const userOrders = async (_req: Request, res: Response) => {
  const users = await usersOrders.usersOrders();
  res.json(users);
};
const expensiveProduct = new ExpensiveProductsQueries();

const expensiveProducts = async (_req: Request, res: Response) => {
  const products = await expensiveProduct.expensiveProducts();
  res.json(products);
};

export default dashboardRoutes;
