const { StatusCodes } = require("http-status-codes");
const User = require("../models/UserSchema");
const Project = require("../models/ProjectSchema");
const Task = require("../models/TaskSchema");
const mongoose = require("mongoose");


const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

const getSpecificUser = async (req, res) => {
  const user = await User.findOne({ ...req.body });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};
const getUserById = async (req, res) => {
  const {id} = req.params
  const isValidId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidId) throw new Error("invalid MongoDB Id");
  const user = await User.findById(req.params.id);
  if (!user) throw new Error("User does not exists");
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

const getAllUser = async (req, res) => {
  const user = await User.find({ role: { $ne: "admin" } }).sort({lastName:1});
//   const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json(user);
};

const getApplicationStatus = async (req, res) => {
  const users = await User.countDocuments();
  const projects = await Project.countDocuments();
  const tasks = await Task.countDocuments();
  res.status(StatusCodes.OK).json({ users, projects, tasks });
};
const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password;
  const updatedUser = await User.findByIdAndUpdate(req.user.userId,  obj );
  res.status(StatusCodes.OK).json(updatedUser);
};

const deleteUser = async (req, res) => {
  const user = await User.findOneAndDelete({_id:req.params.id});
  


  res.status(StatusCodes.OK).json(user);
}

module.exports = { getApplicationStatus, getCurrentUser, updateUser, getSpecificUser, getAllUser, deleteUser, getUserById };
