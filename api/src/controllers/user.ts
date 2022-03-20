import { Request, Response } from "express";
import User, { IUser } from "../models/User";

export const signIn = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const user: IUser = await User.findOne({ email });
    if (!user) {
      throw new Error("Email or password is wrong.");
    }
    const isMatch = await user.validatePassword(password);
    if (!isMatch) {
      throw new Error("Invalid password.");
    }
    const token: string = await user.generateAuthToken();
    res
      .header("auth-token", token)
      .send({ successMsg: "You signed in successfully." });
  } catch (error: any) {
    res.status(400).send({ error, errorMsg: error.message });
  }
};

export const signUp = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password, email } = req.body;
    const emailAlreadyExists: IUser = await User.findOne({ email });
    if (emailAlreadyExists) {
      throw new Error("Email already exists.");
    }
    const usernameAlreadyExists: IUser = await User.findOne({ username });
    if (usernameAlreadyExists) {
      throw new Error("Username already exists.");
    }
    const user: IUser = new User({
      username,
      email,
      password,
    });
    user.password = await user.encryptPassword(user.password);
    const token: string = await user.generateAuthToken();
    await user.save();
    res
      .header("auth-token", token)
      .status(201)
      .send({ successMsg: "User created successfully" });
  } catch (error: any) {
    res.status(400).send({ error, errorMsg: error.message });
  }
};

export const logOut = async (req: Request, res: Response): Promise<any> => {
  try {
    const user: IUser = await User.findById(req.userID);
    await user.deleteAuthToken(req.token);
    res.send({ successMsg: "You logged out successfully."});
  } catch (error: any) {
    res.status(400).send({ error, errorMsg: error.message });
  }
};

export const profile = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findById(req.userID);
    if (!user) {
      throw new Error("Oops! the user does not exist.");
    }
    const username: string = user.username;
    res.send({ successMsg: "Here is your user info.", username });
  } catch (error: any) {
    res.status(400).send({ error, errorMsg: error.message });
  }
};
