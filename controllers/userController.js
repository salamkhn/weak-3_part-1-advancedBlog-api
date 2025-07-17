import bcryptjs from "bcryptjs";
import { user } from "../models/userModel.js";

//userRegister
export const userRegister = async (req, res) => {
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
    return res.status(500).json({
      message: "internal server error (userRegistration)",
      success: false,
      error: err.message,
    });
  }
};

//userLogin
export const userLogin = async (req, res) => {
  try {
    const { Email, password } = req.body;
    console.log("req.body :", req.body);

    //validation
    if (!Email) {
      if (!password) {
        return res.status(400).json({
          message: "invalid login details",
          success: false,
        });
      }
    }

    const Existuser = await user.findOne({ Email });

  

    const encodePassword = bcryptjs.compare(password, Existuser.password);

    if (Email !== Existuser.Email || encodePassword == false) {
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
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error (userLogin)",
      success: false,
      error: err.message,
    });
  }
};
