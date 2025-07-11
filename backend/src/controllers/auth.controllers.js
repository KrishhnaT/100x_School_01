import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

dotenv.config();

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" }); 
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword });
    await user.save();

const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, {
  expiresIn: "7d",
});


    return res.status(201).json({ 
      status: "success",
      message: "User Registered Successfully !!",
      token: token,
    }); 
  } catch (error) {
    console.error("Signup Error: ", error);
    return res.status(500).json({ message: "Server Error" }); 
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, {
  expiresIn: "7d",
});

    return res.status(201).json({ 
      status: "success",
      message: "User Login Success !!",
      token: token,
    }); 
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

