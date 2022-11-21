import express, { Request, Response } from 'express';
import { User, userSchmea } from '../models/user';
import validateToken from '../middleware/validate-token';
import decodeToken from '../shared/decode-token';

const user = new userSchmea();
require('dotenv').config('../../.env');

const index = async (req: Request, res: Response) => {
  const usersList = await user.index();
  res.json(usersList);
};

const showUser = async (req: Request, res: Response) => {
  const selectedUser = await user.show(req.params.id);
  res.json(selectedUser);
};

const create = async (req: Request, res: Response) => {
  const newUserData: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
  };

  try {
    const newUser = await user.create(newUserData);

    if (!newUser) {
      res.status(400);
      res.send('User Exisit');
      return;
    }

    res.status(200);
    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.send(`error Create user with data ${err}`);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const token = await user.authenticate(username, password);

    if (token) {
      res.status(200);
      res.json({ token });
    } else {
      res.status(400);
      res.json({ message: 'Error while authinticate' });
    }
  } catch (error) {
    res.status(400);
    res.send(`Can't Authinticate user ${error}`);
  }
};

const update = async (req: Request, res: Response) => {
  const updatedUser: User = {
    id: parseInt(req.params.id),
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  try {
    const upodatedUser = await user.update(updatedUser);
    res.json(upodatedUser);
  } catch (error) {
    res.send(`Can't UPDATE user error  ${error}`);
  }
};

const getUserOrders = async (req: Request, res: Response) => {
  // const user_id = await decodeToken(req);
  const productsList = await user.getUserOrders(req.params.id);
  res.json(productsList);
};

const users_routes = (app: express.Application) => {
  app.post('/users/authenticate', authenticate);
  app.get('/users/get', validateToken, index);
  app.get('/users/get/:id', validateToken, showUser);
  app.post('/users/add', create);
  app.put('/users/update/:id', validateToken, update);
  app.get('/users/orders/:id', validateToken, getUserOrders);
};

export default users_routes;
