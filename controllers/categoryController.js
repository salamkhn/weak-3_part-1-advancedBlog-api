import { category } from "../models/categoryModel.js";
import Joi from "joi";

export const categorySchema = Joi.object({
  categoryName: Joi.string().min(5).required(),
});
// insert-category
export const insertcategory = async (req, res) => {
  const { error } = categorySchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const { categoryName } = req.body;
    const exist = await category.findOne({ categoryName });

    console.log("exist :", exist);

    //validation
    if (exist) {
      return res.status(400).json({
        message: "category with this name is present  just select",
        success: false,
      });
    }

    const categoryDetails = new category({
      categoryName,
    });

    await categoryDetails.save();
    return res.status(201).json({
      message: "category added successfullly",
      success: true,
      categoryDetails,
    });
  } catch (err) {
    next(err);
  }
};

//showallcategory
export const showallcategory = async (req, res) => {
  try {
    const allcategories = await category.find({});

    if (!allcategories) {
      return res.status(400).json({
        message: "not any category found",
        success: false,
      });
    }

    //success response
    return res.status(200).json({
      message: "these categoy found",
      allcategories,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
