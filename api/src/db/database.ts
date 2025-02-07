import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  await mongoose.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  );
  console.log("db is connected.");
};

//mongodb://localhost:27017/contablito, local database