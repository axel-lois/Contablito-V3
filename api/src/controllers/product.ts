import Product, { IProduct } from "../models/Product";
import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import productRouter from "routes/product";

export const postProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, stock, minStock, price } = req.body;
    const product: IProduct = new Product({
      name,
      description,
      stock,
      minStock,
      price,
      owner: req.userID,
    });
    await product.save();
    res.send({ successMsg: "Product created successfully" });
  } catch (error: any) {
    res.status(400).send({ error, errorMsg: error.message });
  }
};

export const putProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, stock, minStock, price } = req.body;
    const product: IProduct = await Product.findOneAndUpdate(
      { _id: req.params.id, owner: req.userID },
      {
        name,
        description,
        stock,
        minStock,
        price,
      }
    );
    if (!product) {
      throw new Error("Product not found.");
    }
    res.send({ successMsg: "Product updated successfully." });
  } catch (error: any) {
    res.status(400).send({ error, errorMsg: error.message });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product: IProduct = await Product.findOneAndDelete({
      owner: req.userID,
      _id: req.params.id,
    });
    if (!product) {
      throw new Error("Product not found.");
    }
    res.send({ successMsg: "Product deleted successfully." });
  } catch (error: any) {
    res.status(400).send({ error, errorMsg: error.message });
  }
};

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products: IProduct[] = await Product.find({ owner: req.userID });
    if (products.length === 0) {
      throw new Error("No products were found.");
    }
    res.send(products);
  } catch (error: any) {
    res.status(400).send({ error, errorMsg: error.message });
  }
};

export const getProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const product: IProduct = await Product.findById({
      _id: req.params.id,
      owner: req.userID,
    });
    if (!product) {
      throw new Error("Product not found.");
    }
    res.send({ successMsg: "Here is your product.", product });
  } catch (error: any) {
    res.status(400).send({ error, errorMsg: error.message });
  }
};
