// const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const Tasks = require("../models/TaskSchema");
const Project =require("../models/ProjectSchema")
const User =require('../models/UserSchema')

//gets all Tasks
const getAllTasks = async (req, res) => {
  let query={}


if (req.user.role !== "admin") {
    query = {
      $or: [
        { createdBy: req.user.userId },
        { assignedUser: { $elemMatch: { $eq: req.user.userId } } },
      ],
    };
  }

  const task = await Tasks.find(query).sort().exec();


  res.status(200).json(task);
};


const getAllUserTask = async (req, res) => {
  const Task = await Tasks.find({assignedUser:req.user.userId}).sort({ createdAt: -1 });
  res.status(200).json(Task);
};


//get a single Task by id
const getSingleTask = async (req, res) => {
  const Task = await Tasks.findById(req.params.id)
  res.status(200).json(Task);
};

//create a new Task
const createTask = async (req, res) => {
  req.body.createdBy = req.user.userId;
  req.body.assignedUser = req.body.assignedUser.split(",");

  const newTask = await Tasks.create(req.body);
  const project = await Project.findById(req.body.project);

  const users = await User.updateMany(
    { _id: { $in: req.body.assignedUser } },
    { $push: { tasks: newTask } }
  ).exec();

  console.log('Task added to users:', req.body.assignedUser);
  console.log('Users updated:', users);

  project.tasks.push(newTask);
  await project.save();

  res.status(StatusCodes.CREATED).json(newTask);
};

//Update a Task data
const updateTask = async (req, res) => {
if (req.body.assignedUser) {
  req.body.assignedUser = req.body.assignedUser.split(",");
} 
if(!req.body.assignedUser){
  req.body.assignedUser = req.body.assignedUser
}
  const { id: taskId } = req.params; 
  const task = await Tasks.findOneAndUpdate({ _id: taskId },  req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    throw new Error("Project not found");
  }
  res.status(StatusCodes.OK).json(task);
};
 
//delete a Task
const deleteTask = async (req, res) => {
  const Task = await Tasks.findOneAndDelete({ _id: req.params.id });

  await Project.updateMany(
    { tasks: Task._id },
    { $pull: { tasks: Task._id } }
  );
  await User.updateMany(
    { tasks: Task._id },
    { $pull: { tasks: Task._id } }
  );

  res.status(StatusCodes.OK).json(Task);
};



module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
  getAllUserTask
};
