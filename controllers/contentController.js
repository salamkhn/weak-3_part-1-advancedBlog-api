import { content } from "../models/contentModel.js";
import Joi from "joi";

//joi validation
export const noteSchema = Joi.object({
  title: Joi.string().min(5).required(),
  subtitle: Joi.string().allow(""),
  blogcontent: Joi.string().allow(""),
});

//insert content
export const insertContent = async (req, res) => {
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
