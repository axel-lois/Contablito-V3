import express, { Application } from "express";
import morgan from "morgan";
import userRouter from "../routes/user";
import productRouter from "../routes/product";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const allowedOrigin: string = process.env.ORIGIN;
const options: cors.CorsOptions = {
  origin: allowedOrigin,
  methods: "GET,HEAD,PUT,POST,DELETE",
  optionsSuccessStatus: 200,
  exposedHeaders: "auth-token",
};

//creating server
const server: Application = express();

//middleware
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(morgan("dev"));
server.use(cors(options));

//routes
server.use("/api/auth", userRouter);
server.use("/products", productRouter);

export default server;
