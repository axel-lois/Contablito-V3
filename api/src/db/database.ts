import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7f8qr.mongodb.net/${process.env.DB_NAME}`
  );
  console.log("db is connected.");
};

//mongodb://localhost:27017/contablito, local database
