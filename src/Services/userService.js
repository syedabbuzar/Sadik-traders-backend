import User from "../models/User.js";

export const createUser = async (data) => {
  return await User.create(data);
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const getUserById = async (id) => {
  return await User.findById(id).select("-password");
};

export const getAllUsers = async () => {
  return await User.find().select("-password");
};