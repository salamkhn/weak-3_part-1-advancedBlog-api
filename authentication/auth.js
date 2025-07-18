import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
  const token = req.header("auth");

  if (!token) {
    return res.status(400).json({
      message: "login first",
      success: false,
    });
  }

  console.log("token :", token);
  //veryfing token
  const user = jwt.verify(token, process.env.SECRETE_KEY);
  console.log("user from auth :", user);

  req.user = user;
  next();
};
