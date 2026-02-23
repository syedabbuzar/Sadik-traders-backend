import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail, getAllUsers, getUserById } from "../Services/userService.js";

const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

// -------------------- REGISTER --------------------
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await findUserByEmail(email);
    if (exists) return res.status(400).json({ msg: "User already exists" });

    const hash = await bcrypt.hash(password, 10);

    // -------------------- ROLE LOGIC --------------------
    let userRole = "user"; // default

    if (role === "admin" && email === process.env.ADMIN_EMAIL) {
      // Only email in .env can be admin
      userRole = "admin";
    }

    const user = await createUser({
      name,
      email,
      password: hash,
      role: userRole,
    });

    res.json({
      token: generateToken(user._id, user.role),
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -------------------- LOGIN --------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ msg: "Invalid email" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });

    res.json({
      token: generateToken(user._id, user.role),
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -------------------- GET PROFILE --------------------
export const getProfile = async (req, res) => {
  const user = await getUserById(req.user._id);
  res.json(user);
};

// -------------------- ADMIN ONLY CONTROLLERS --------------------
export const allUsers = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ msg: "Admin only access" });

  const users = await getAllUsers();
  res.json(users);
};

// CREATE NEW ADMIN (ONLY ADMIN CAN CREATE)
export const createAdmin = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ msg: "Admin only access" });

  try {
    const { name, email, password } = req.body;

    const exists = await findUserByEmail(email);
    if (exists) return res.status(400).json({ msg: "User already exists" });

    const hash = await bcrypt.hash(password, 10);

    const adminUser = await createUser({
      name,
      email,
      password: hash,
      role: "admin",
    });

    res.json({
      token: generateToken(adminUser._id, adminUser.role),
      user: adminUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
