import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
import localLogger from "../utils/localLogger.js";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);

    let dbName = process.env.MONGO_URL;
    dbName = dbName.split("/")[2].slice(0, 7);

    localLogger.info(
      `Server connected to MongoDB Database "${dbName}" through ${mongoose.connection.host}`
        .bgMagenta.white
    );
    console.log(
      `Server connected to MongoDB Database "${dbName}" through ${mongoose.connection.host}`
        .bgMagenta.white
    );
  } catch (error) {
    localLogger.error(`Mongodb Error ${error}`.bgRed.white);
    console.log(`Mongodb Error ${error}`.bgRed.white);
  }
};

export default connectDB;
