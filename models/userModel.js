import mongoose from "mongoose";

const userSchema = {
  firstName: {
    type: String,
    required: [true, "firstName is required"],
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
    required: [true, "password is required"],
  },
};

export const user = mongoose.model("user", userSchema);
