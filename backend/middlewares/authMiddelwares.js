import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userID).select("-password");
      next();
    } catch (error) {
      res.status(404).json({ message: "Invalid token" });
    }
  } else {
    return res.status(404).json({ message: "Not authenticated" });
  }
});

const authorizeAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(404).json({ message: "not authorized as admin" });
  }
});

export { authenticate, authorizeAdmin };
