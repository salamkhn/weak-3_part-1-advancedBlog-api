import { config } from "dotenv";
config();
import mongoose from "mongoose";

export const dbsCon = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("data base connection successfully");
  } catch (err) {
    console.log("error during dbsCon :", err.message);
    process.exit(1);
  }
};
