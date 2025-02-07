import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  await mongoose.connect(
    `${process.env.MONGO_URL}/${process.env.MONGO_DB_NAME}`
  );
  console.log("db is connected.");
};

//mongodb://localhost:27017/contablito, local database