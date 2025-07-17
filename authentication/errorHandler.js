import mongoose from "mongoose";

export const errorHandler = (err, req, res, next) => {
  console.log("error :", err);
  return res.status(500).json({
    message: "internal server error",
    success: false,
    error: err.message,
  });
};
