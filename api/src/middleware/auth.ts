import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";

interface IPayload {
  _id: string;
  iat: number;
}

const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token: string = req.header('auth-token') ||'';
    if (!token) throw new Error('There is no token.');
  try {
    const payload = jwt.verify(token,process.env.SECRET_KEY || "secret") as IPayload;
    const user = await User.findOne({
        _id: payload._id,
        'tokens.token': token
    })
    if (!user) throw new Error('Your user does not have the token provided.');
    req.userID = payload._id;
    req.token = token;
    next();
  } catch (e: any) {
    res.status(400).send({ errorMsg: e.message });
  }
};

export default auth;
