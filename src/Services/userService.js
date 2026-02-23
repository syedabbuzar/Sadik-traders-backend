import User from "../Model/userModel.js";

export const createUser = (data) => User.create(data);

export const findUserByEmail = (email) =>
  User.findOne({ email });

export const getAllUsers = () => User.find();

export const getUserById = (id) =>
  User.findById(id).select("-password");
