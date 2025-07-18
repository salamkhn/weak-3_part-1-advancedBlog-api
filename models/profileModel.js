import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    blog: {
      type: mongoose.Types.ObjectId,
      ref: "content",
    },
    profilePicture: {
      type: String,
      required: [true, "profilePicture required"],
    },
    bio: {
      type: String,
      required: [true, "bio is required"],
    },
  },
  { timestamps: true }
);

export const profile = mongoose.model("profile", profileSchema);
