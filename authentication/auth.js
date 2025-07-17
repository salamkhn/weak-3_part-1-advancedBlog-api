import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
  const token = req.header("auth");

  if (!token) {
    return res.status(400).json({
      message: "token required",
      success: false,
    });
  }
  console.log("token in autn :", token);

  //veryfing token
  const user = jwt.verify(token, "YY)()(()");

  req.user = user;
  next();
};
