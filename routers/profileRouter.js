import Router from "express";
import {
  allprofils,
  getprofilebyId,
  getprofilebyidandDelete,
  getprofilebyidandUpdate,
  insertProfile,
} from "../controllers/profileController.js";
import { isAuthenticated } from "../authentication/auth.js";

export const profileRouter = Router();

// @purpose insert profile
// @method post
// @endpoint "/api/blog/profile"
profileRouter.post("/insert", isAuthenticated, insertProfile);

// @purpose showallprofils
//@method =>get
//end-point => api/blog/content/showallprofils
profileRouter.get("/showallprofiles", isAuthenticated, allprofils);

// @purpose getprofilebyid
//@method =>get
//end-point => api/blog/profile/getbyId/:id
profileRouter.get("/getbyid/:id", isAuthenticated, getprofilebyId);

// @purpose getprofilebyidandupdate
//@method =>put
//end-point => api/blog/content/getbyidandupdate/:id
profileRouter.put(
  "/getprofilebyidandupdate/:id",
  isAuthenticated,
  getprofilebyidandUpdate
);

// @purpose getblogbyidanddelete
//@method =>delete
//end-point => api/blog/content/getbyidanddelete/:id
profileRouter.delete(
  "/getprofilebyidanddelete/:id",
  isAuthenticated,
  getprofilebyidandDelete
);
