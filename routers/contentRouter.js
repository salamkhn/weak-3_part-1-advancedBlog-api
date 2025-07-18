import { Router } from "express";
import {
  allblogsContent,
  getblogbyId,
  getbyidandDelete,
  getbyidandUpdate,
  insertContent,
} from "../controllers/contentController.js";
import { isAuthenticated } from "../authentication/auth.js";

export const contentRouter = Router();

// @purpose insertContent
//@method =>Post
//end-point => api/blog/content/insert
contentRouter.post("/insert", isAuthenticated, insertContent);

// @purpose showallblogs
//@method =>get
//end-point => api/blog/content/showallblogscontent
contentRouter.get("/showallblogscontent", isAuthenticated, allblogsContent);

// @purpose getblogbyid
//@method =>get
//end-point => api/blog/content/getbyId/:id
contentRouter.get("/getbyid/:id", isAuthenticated, getblogbyId);

// @purpose getblogbyidandupdate
//@method =>put
//end-point => api/blog/content/getbyidandupdate/:id
contentRouter.put("/getbyidandupdate/:id", isAuthenticated, getbyidandUpdate);

// @purpose getblogbyidanddelete
//@method =>delete
//end-point => api/blog/content/getbyidanddelete/:id
contentRouter.delete(
  "/getbyidanddelete/:id",
  isAuthenticated,
  getbyidandDelete
);
