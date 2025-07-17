import { Router } from "express";
import { userLogin, userRegister } from "../controllers/userController.js";

export const userRouter = Router();

// @purpose userRegistration
//@method =>Post
//end-point => api/blog/user/register
userRouter.post("/register", userRegister);

// @purpose userLogin
//@method =>Post
//end-point => api/blog/user/login
userRouter.post("/login", userLogin);
