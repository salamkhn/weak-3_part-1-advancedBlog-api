import { profile } from "../models/profileModel.js";
import Joi from "joi";

const profileSchema = Joi.object({
  profilePicture: Joi.string().required(),
  bio: Joi.string().required(),
});

//insert profile
export const insertProfile = async (req, res, next) => {
  const { error } = profileSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const { profilePicture, bio } = req.body;

    const profileDetails = new profile({
      user: req.user.userId,
      profilePicture,
      bio,
    });

    //save to dbs
    await profileDetails.save();

    //success response
    return res.status(201).json({
      message: "profile saved successfully",
      profileDetails,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

//show allprofils
export const allprofils = async (req, res, next) => {
  try {
    const profils = await profile.find();

    if (!profils || profils.lenght === 0) {
      return res.status(400).json({
        message: "no profile present",
        success: false,
      });
    }

    return res.status(200).json({
      message: "profiles found",
      success: true,
      profils,
    });
  } catch (err) {
    next(err);
  }
};

//getblog by id
export const getprofilebyId = async (req, res, next) => {
  try {
    const id = req.params.id;

    const pro_file = await profile.findById(id);

    //validation
    if (!pro_file) {
      return res.status(400).json({
        message: "not profile found",
        success: false,
      });
    }

    //success response
    return res.status(200).json({
      message: "profiles founds",
      pro_file,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

//getbyid and update
export const getprofilebyidandUpdate = async (req, res, next) => {
  const { profilePicture, bio } = req.body;
  try {
    const id = req.params.id;

    const pro_file = await profile.findByIdAndUpdate(
      id,
      { profilePicture, bio },
      { new: true }
    );

    //validation
    if (!pro_file) {
      return res.status(400).json({
        message: "profile not found",
        success: false,
      });
    }

    //success response
    return res.status(200).json({
      message: "profile updated successfully",
      pro_file,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

//get by id and delete
export const getprofilebyidandDelete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const pro_file = await profile.findByIdAndDelete(id);

    if (!pro_file) {
      return res.status(400).json({
        message: "no profile",
        success: false,
      });
    }

    return res.status(200).json({
      message: "profile deleted successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
