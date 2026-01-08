import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  if (!process.env.MONGO_URI) {
    throw new Error("❌ MONGO_URI is missing");
  }

  await mongoose.connect(process.env.MONGO_URI, {
    dbName: "url-shortener",
  });

  isConnected = true;
  console.log("✅ MongoDB connected");
};
