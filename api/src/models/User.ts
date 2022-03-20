import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Product from "./Product";

interface IToken {
  token: string;
  _id: string;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  tokens: IToken[];
  generateAuthToken(): Promise<string>;
  encryptPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
  deleteAuthToken(token: string): Promise<void>;
}

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Please provide an username'],
    minlength: 4,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide an email.'],
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: 6,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.generateAuthToken = async function (): Promise<string> {
  const token: string = jwt.sign(
    { _id: this._id },
    process.env.SECRET_KEY || "secret"
  );
  this.tokens = [...this.tokens, { token }];
  await this.save();
  return token;
};

userSchema.methods.deleteAuthToken = async function (
  token: string
): Promise<void> {
  this.tokens = this.tokens.filter((tok: IToken) => tok.token !== token);
  await this.save();
};

userSchema.methods.encryptPassword = async (
  password: string
): Promise<string> => {
  return await bcrypt.hash(password, 8);
};

userSchema.methods.validatePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>("User", userSchema);
