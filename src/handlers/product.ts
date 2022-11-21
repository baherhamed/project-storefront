import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import validateToken from '../middleware/validate-token';

const productModel = new ProductStore();

const index = async (req: Request, res: Response) => {
  const Products = await productModel.index();
  res.json(Products);
};

const getProductCategory = async (req: Request, res: Response) => {
  const productsList = await productModel.productCategory(req.params.category);
  res.json(productsList);
};

const popularProductRate = async (req: Request, res: Response) => {
  const productsList = await productModel.popularProduct();
  res.json(productsList);
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
    id: req.params.id,
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    popular_rate: req.body.popular_rate,
  };
  const updatedProduct = await productModel.update(updatedProductData);
  res.json(updatedProduct);
};

const deletedProduct = async (req: Request, res: Response) => {
  await productModel.delete(req.params.id);
  res.json({ message: 'Deleted succefully' });
};

const showProduct = async (req: Request, res: Response) => {
  const selectedProduct = await productModel.show(req.params.id);
  res.json(selectedProduct);
};

const products_routes = (app: express.Application) => {
  app.get('/products/get', validateToken, index);
  app.get('/products/getPopularProductRate', validateToken, popularProductRate);
  app.post('/products/get/:id', validateToken, showProduct);
  app.get('/products/get/:category', validateToken, getProductCategory);
  app.post('/products/add', validateToken, createProduct);
  app.put('/products/update/:id', validateToken, updateProduct);
  app.delete('/products/delete/:id', validateToken, deletedProduct);
};

export default products_routes;
