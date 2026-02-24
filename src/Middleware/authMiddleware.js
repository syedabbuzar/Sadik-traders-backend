import jwt from "jsonwebtoken";
import User from "../Model/userModel.js";

// VERIFY TOKEN
export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
      return res.status(401).json({ msg: "No token, authorization denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user)
      return res.status(401).json({ msg: "User not found" });

    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

// ADMIN CHECK
export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      msg: "Access denied. Admin only",
    });
  }
  next();
};
