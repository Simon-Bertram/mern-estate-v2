import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 12);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(200).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "Invalid email or password"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid email or password"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {});
    // Remove the password from the response
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, {
        maxAge: 86400,
        sameSite: "strict",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    // Check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // If the user exists, create a token, passing something unique
      // (like the user id) as the payload
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {});
      // Remove the password from the response
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, {
          maxAge: 86400,
          sameSite: "strict",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 12);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
    }
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User signed out successfully");
  } catch (error) {
    next(error);
  }
};
