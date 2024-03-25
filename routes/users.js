import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validateRequestBody } from "../middleware/validation.middleware.js";
import {
  loginValidationSchema,
  userValidationSchema,
} from "../validation/user.validation.js";
import { User } from "../models/userModel.js";

const router = express.Router();

// register user
router.post(
  "/user/register",
  validateRequestBody(userValidationSchema),
  async (req, res) => {
    const newUser = req.body;

    // check if user already exists with provided email

    const user = await User.findOne({ email: newUser.email });

    // if user ,than throw error

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;

    // create user
    const createdUser = await User.create(newUser);

    // send appropriate response
    return res.status(201).json({
      message: "User created successfully",
      user: createdUser,
    });
  }
);

// login user
router.post(
  "/user/login",
  validateRequestBody(loginValidationSchema),
  async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  }
);

export default router;
