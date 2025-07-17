import { Router } from "express";
import { insertContent } from "../controllers/contentController.js";
import { isAuthenticated } from "../authentication/auth.js";

export const contentRouter = Router();

// @purpose insertContent
//@method =>Post
//end-point => api/blog/content/insert
contentRouter.post("/insert", isAuthenticated, insertContent);
