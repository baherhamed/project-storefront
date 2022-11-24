import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import validateToken from '../middleware/validate-token';

const productModel = new ProductStore();

const index = async (req: Request, res: Response) => {
  try {
    const Products = await productModel.index();
    res.json(Products);
  } catch (error) {
    res.status(400);
    res.send(`error while get products ${error}`);
  }
};

const getProductCategory = async (req: Request, res: Response) => {
  try {
    const productsList = await productModel.productCategory(
      req.params.category
    );
    res.json(productsList);
  } catch (error) {
    res.status(400);
    res.send(`error while get products by category ${error}`);
  }
};

const popularProductRate = async (req: Request, res: Response) => {
  try {
    const productsList = await productModel.popularProduct();
    res.json(productsList);
  } catch (error) {
    res.status(400);
    res.send(`error while get products rates ${error}`);
  }
};

const createProduct = async (req: Request, res: Response) => {
  const newProductData: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    popular_rate: req.body.popular_rate,
  };

  try {
    const newProduct = await productModel.create(newProductData);
    if (!newProduct) {
      res.status(400);
      res.send('Product Exisit');
      return;
    }
    res.status(200);
    res.json(newProduct);
  } catch (error) {
    res.status(400);
    res.json(`Can't Cretae the product err: ${error}`);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const updatedProductData: Product = {
    id: parseInt(req.params.id),
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    popular_rate: req.body.popular_rate,
  };

  try {
    const updatedProduct = await productModel.update(updatedProductData);
    res.json(updatedProduct);
  } catch (error) {
    res.status(400);
    res.send(`error while update product  ${error}`);
  }
};

const deletedProduct = async (req: Request, res: Response) => {
  try {
    await productModel.delete(req.params.id);
    res.json({ message: 'Deleted succefully' });
  } catch (error) {
    res.status(400);
    res.send(`error while delete product  ${error}`);
  }
};

const showProduct = async (req: Request, res: Response) => {
  try {
    const selectedProduct = await productModel.show(req.params.id);
    res.json(selectedProduct);
  } catch (error) {
    res.status(400);
    res.send(`error while show product data ${error}`);
  }
};

const products_routes = (app: express.Application) => {
  app.get('/products/get', index);
  app.get('/products/getPopularProductRate', validateToken, popularProductRate);
  app.get('/products/get/:id', showProduct);
  app.get('/products/get/:category', validateToken, getProductCategory);
  app.post('/products/add', validateToken, createProduct);
  app.put('/products/update/:id', validateToken, updateProduct);
  app.delete('/products/delete/:id', validateToken, deletedProduct);
};

export default products_routes;
