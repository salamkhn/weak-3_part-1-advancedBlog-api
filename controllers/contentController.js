import { content } from "../models/contentModel.js";
import Joi from "joi";

//joi validation
export const noteSchema = Joi.object({
  title: Joi.string().min(5).required(),
  subtitle: Joi.string().allow(""),
  blogcontent: Joi.string().allow(""),
});

//insert content
export const insertContent = async (req, res, next) => {
  const { error } = noteSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const { title, subtitle, blogcontent } = req.body;

    // validation through joi library

    const blogData = new content({
      title,
      subtitle,
      blogcontent,
      user: req.user.userId,
    });
    //save to dbs
    await blogData.save();

    //success Response
    return res.status(200).json({
      message: "blogDetail saved successfully",
      blogData,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

//show allContent
export const allblogsContent = async (req, res) => {
  try {
    const blogsContant = await content.find();

    if (!blogsContant || blogsContant.lenght === 0) {
      return res.status(400).json({
        message: "no blogs found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "these blogs found",
      success: true,
      blogsContant,
    });
  } catch (err) {
    next(err);
  }
};

//getblog by id
export const getblogbyId = async (req, res, next) => {
  try {
    const id = req.params.id;

    const blog = await content.findById(id);

    //validation
    if (!blog) {
      return res.status(400).json({
        message: "no blog found",
        success: false,
      });
    }

    //success response
    return res.status(200).json({
      message: "this blog found",
      blog,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

//getbyid and update
export const getbyidandUpdate = async (req, res, next) => {
  const { title, subtitle, blogcontent } = req.body;
  try {
    const id = req.params.id;

    const blog = await content.findByIdAndUpdate(
      id,
      { title, subtitle, blogcontent },
      { new: true }
    );

    //validation
    if (!blog) {
      return res.status(400).json({
        message: "no blog",
        success: false,
      });
    }

    //success response
    return res.status(200).json({
      message: "blog updated successfully",
      blog,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

//get by id and delete
export const getbyidandDelete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const blog = await content.findByIdAndDelete(id);

    if (!blog) {
      return res.status(400).json({
        message: "no blog",
        success: false,
      });
    }

    return res.status(200).json({
      message: "blog deleted successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
