import mongoose from "mongoose";

export const dbsCon = () => {
  try {
    mongoose.connect(
      "mongodb://motivation3272:QcY51TmKoqwU2F4W@ac-gnfz8l9-shard-00-00.q7xksef.mongodb.net:27017,ac-gnfz8l9-shard-00-01.q7xksef.mongodb.net:27017,ac-gnfz8l9-shard-00-02.q7xksef.mongodb.net:27017/advancedblogapi?replicaSet=atlas-fba30y-shard-0&ssl=true&authSource=admin"
    );
    console.log("data base connection successfully");
  } catch (err) {
    console.log("error during dbsCon :", err.message);
    process.exit(1);
  }
};
