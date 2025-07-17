import mongoose from "mongoose";

const contentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
      required: [true, "tittle required"],
    },
    subtitle: {
      type: String,
    },
    blogcontent: {
      type: String,
    },
  },
  { timestamps: true }
);

//model
export const content = mongoose.model("content", contentSchema);
