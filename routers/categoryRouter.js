// NOTE!!
// in category we will used select option if categoryName which is provided by
// user not matched to any existining category options than  added in select option
//  otherwise user should have to select from this category

import { Router } from "express";
import {
  insertcategory,
  showallcategory,
} from "../controllers/categoryController.js";
import { isAuthenticated } from "../authentication/auth.js";

export const categoryRouter = Router();

// @purpose insertcategory
// @method post
// @endpoint "/api/blog/category/insert"
categoryRouter.post("/insert", isAuthenticated, insertcategory);
// @purpose showallcategories
//@method =>get
//end-point => api/blog/content/showallcategory
categoryRouter.get("/showallcatogory", isAuthenticated, showallcategory);
