import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.user.id);

    if (!user) {
      console.log("Error here ")      
      return res.status(401).json({ message: "Invalid token" });

    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in middleware: ",error)
    return res.status(401).json({ message: "Invalid token" });
  }
};