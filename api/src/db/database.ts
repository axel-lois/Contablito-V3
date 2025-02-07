import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  await mongoose.connect(
    `${process.env.MONGO_URL}`
  );
  console.log("db is connected.");
};

//mongodb://localhost:27017/contablito, local database