import bcryptjs from "bcryptjs";
import { user } from "../models/userModel.js";
import Joi from "joi";
import jwt from "jsonwebtoken";

//validation with joi
const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().allow(""),
  Email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
//userRegister
export const userRegister = async (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const { firstName, lastName, Email, password } = req.body;

    //validation
    if (!firstName || !Email || !password) {
      return res.status(400).json({
        message: "fill all compulsory fields",
        success: false,
      });
    }

    //already exist
    const exist = await user.findOne({ Email });

    if (exist) {
      return res.status(400).json({
        message: "user already exist",
        success: false,
      });
    }

    //hashing password
    const hashedPassword = await bcryptjs.hash(password, 10);

    const userData = new user({
      firstName,
      lastName,
      Email,
      password: hashedPassword,
    });

    //save to dbs
    await userData.save();

    //success response
    return res.status(201).json({
      message: "user successfully stored",
      succes: true,
      userData,
    });
  } catch (err) {
    next(err);
  }
};

//userLogin
export const userLogin = async (req, res, next) => {
  try {
    const { Email, password } = req.body;

    //validation
    if (!Email || Email.length === 0) {
      if (!password || password.length === 0)
        return res.status(400).json({
          message: "invalid login details",
          success: false,
        });
    }

    const Existuser = await user.findOne({ Email });
    if (!Existuser) {
      return res.status(400).json({
        message: "invalid login details",
        succes: false,
      });
    }

    console.log("Existuser", Existuser);

    //password encryption
    const encodePassword = await bcryptjs.compare(password, Existuser.password);

    //token generated
    const token = jwt.sign({ userId: Existuser._id }, process.env.SECRETE_KEY, {
      expiresIn: "5m",
    });

    console.log("token :", token);

    if (encodePassword == false) {
      return res.status(400).json({
        message: "invalid login details",
        success: false,
      });
    }

    // success response
    return res.status(201).json({
      message: "login successfully ",
      succes: true,
      Existuser,
      token,
    });
  } catch (err) {
    next(err);
  }
};
