import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let cachedConnectionPromise = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!cachedConnectionPromise) {
    cachedConnectionPromise = mongoose
      .connect(uri, { autoIndex: true })
      .then((conn) => {
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn.connection;
      })
      .catch((error) => {
        cachedConnectionPromise = null;
        throw error;
      });
  }

  return cachedConnectionPromise;
};

export default connectDB;
