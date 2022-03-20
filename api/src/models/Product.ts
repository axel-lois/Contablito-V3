import mongoose from "mongoose";
import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  stock: number;
  minStock: number;
  price: number;
}

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  minStock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
});

export default model<IProduct>("Product", productSchema);
