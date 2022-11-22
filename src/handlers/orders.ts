import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';

import decodeToken from '../shared/decode-token';

const orderModel = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const order_products = await orderModel.index();
    res.json(order_products);
  } catch (error) {
    res.status(400);
    res.json(`error while get orders: ${error}`);
  }
};

const create = async (req: Request, res: Response) => {
  const user_id = await decodeToken(req);
  const newOrderData: Order = {
    status: 'active',
    user_id,
    productsList: req.body.productsList,
  };

  try {
    const newOrder = await orderModel.create(newOrderData);
    if (!newOrder) {
      res.status(400);
      res.send('Order Exisit');
      return;
    }
    res.status(200);
    res.json(newOrder);
  } catch (error) {
    res.status(400);
    res.json(`Can't Cretae the order err: ${error}`);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const user_id = await decodeToken(req);
    const updatedOrderProductsData: Order = {
      id: req.params.id,
      status: 'active',
      user_id,
      productsList: req.body.productsList,
    };
    const updatedOrder = await orderModel.update(updatedOrderProductsData);
    res.json(updatedOrder);
  } catch (error) {
    res.json(`error whill update order ${error}`);
  }
};

const completeOrder = async (req: Request, res: Response) => {
  try {
    const orderCompleted = await orderModel.closeOrdercomplete(req.params.id);
    res.json(orderCompleted);
  } catch (error) {
    res.status(400);
    res.json(`error whill complete order ${error}`);
  }
};

const deletedArticle = async (req: Request, res: Response) => {
  try {
    await orderModel.delete(req.params.id);
    res.json({ message: 'Deleted succefully' });
  } catch (error) {
    res.status(400);
    res.json(`error whill delete order ${error}`);
  }
};

const orderProducts = async (req: Request, res: Response) => {
  try {
    const productsList = await orderModel.getOrderProducts(req.params.id);
    res.json(productsList);
  } catch (error) {
    res.status(400);
    res.json(`error whill adding order ${error}`);
  }
};

const orders_routes = (app: express.Application) => {
  app.get('/orders/get', index);
  app.post('/orders/add', create);
  app.put('/orders/update/:id', update);
  app.delete('/orders/delete/:id', deletedArticle);
  app.get('/orders/:id/products', orderProducts);
  app.put('/orders/close/:id', completeOrder);
};

export default orders_routes;
