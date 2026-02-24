import jwt from "jsonwebtoken";
import User from "../Model/userModel.js";

// -------------------- VERIFY TOKEN --------------------
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // No token
    if (!token) {
      return res.status(401).json({
        success: false,
        msg: "No token, authorization denied",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        msg: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error("Auth Error:", err.message);

    return res.status(401).json({
      success: false,
      msg: "Invalid or expired token",
    });
  }
};

// -------------------- ADMIN CHECK --------------------
export const isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        msg: "Not authorized, user missing",
      });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        msg: "Access denied. Admin only",
      });
    }

    next();
  } catch (err) {
    console.error("Admin Check Error:", err.message);

    return res.status(500).json({
      success: false,
      msg: "Server error in admin check",
    });
  }
};