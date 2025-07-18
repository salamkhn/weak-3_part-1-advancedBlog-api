import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "firstName  required"],
  },
  lastName: {
    type: String,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password  required"],
  },
});

export const user = mongoose.model("user", userSchema);
