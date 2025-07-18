import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: [true, "category required"],
    },
  },
  { timestamps: true }
);

export const category = mongoose.model("category", categorySchema);
