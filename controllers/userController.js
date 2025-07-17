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
export const userRegister = async (req, res) => {
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
    userData.save();

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
export const userLogin = async (req, res) => {
  try {
    const { Email, password } = req.body;
    console.log("req.body :", req.body);

    //validation
    if (!Email) {
      if (!password)
        return res.status(400).json({
          message: "invalid login details",
          success: false,
        });
    }

    const Existuser = await user.findOne({ Email });

    //password encryption
    const encodePassword = await bcryptjs.compare(password, Existuser.password);

    //token generated
    const token = jwt.sign({ userId: Existuser._id }, "YY)()(()", {
      expiresIn: "1d",
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
