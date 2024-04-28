const Project = require("../models/ProjectSchema");
const Task = require("../models/TaskSchema");
const User = require("../models/UserSchema");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors/customeErrors");
const { mongoose } = require("mongoose");
const dayjs = require("dayjs");
const{TASK_STATUS} = require ('../utils/constants')



//gets all Projects
const getAllProjects = async (req, res) => {
  const { search, sort } = req.query;
  let query = {};

  if (req.user.role !== "admin") {
    query = {
      $or: [
        { createdBy: req.user.userId },
        { team: { $elemMatch: { $eq: req.user.userId } } },
      ],
    };
  }

  if (search) {
    query = { projectName: { $regex: search, $options: "i" } };
  }

  const projects = await Project.find(query).sort().exec();

  res.status(StatusCodes.OK).json(projects);
};

//get a single project by id
const getSingleProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.status(StatusCodes.OK).json(project);
};

//create a new project
const createProject = async (req, res) => {
  req.body.createdBy = req.user.userId;
  req.body.team = req.body.team.split(",");

  const newProject = await Project.create(req.body);

  const users = await User.updateMany(
    { _id: { $in: req.body.team } },
    { $push: { projects: newProject._id } }
  ).exec();

  console.log("Users updated:", users);

  newProject.team = req.body.team;
  await newProject.save();

  res.status(StatusCodes.CREATED).json(newProject);
};

//Update a project data
const updateProject = async (req, res) => {
  if (req.body.team) {
    req.body.team = req.body.team.split(",");
  }
  const { id: projectId } = req.params;
  const project = await Project.findOneAndUpdate({ _id: projectId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!project) {
    throw new Error("Project not found");
  }
  res.status(StatusCodes.OK).json(project);
};

const updateProjectStatus = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new Error("invalid MongoDB Id");

  const project = await Project.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!project) throw new Error("Project does not exists");

  res.status(StatusCodes.OK).json(project);
};

//delete a project
const deleteProject = async (req, res) => {
  try {
    // Delete the project
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Delete all tasks associated with the project
    await Task.deleteMany({ project: req.params.id });

    // Remove the reference to the project from the users collection
    await User.updateMany(
      { projects: project._id },
      { $pull: { projects: project._id } }
    );

    res
      .status(200)
      .json({ message: "Project and associated tasks deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message:
        "An error occurred while deleting the project and associated tasks",
    });
  }
};

const showProjectStats = async (req, res) => {
  let statusStats = await Project.aggregate([
    {
      $match:
        req.user.role === "admin"
          ? {}
          : { createdBy: new mongoose.Types.ObjectId(req.user.userId) } || {
              team: { $elemMatch: { $eq: req.user.userId } },
            },
    },
    { $group: { _id: "$projectStatus", count: { $sum: 1 } } },
    { $sort: { _id: -1 } },
  ]);


  

  let CompletionStats = await Project.aggregate([
    {
      $match:
        req.user.role === "admin"
          ? {}
          : { createdBy: new mongoose.Types.ObjectId(req.user.userId) } || {
              team: { $elemMatch: { $eq: req.user.userId } },
            },
    },
    {
      $group: {
        _id: "$projectCompletion",
        count: { $sum: 1 },
      },
    },
  ]);

  CompletionStats = CompletionStats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  console.log(CompletionStats);
  const defaultCompletionStats = {
    pending: CompletionStats.pending || 0,
    in_progress: CompletionStats.in_progress || 0,
    done: CompletionStats.done || 0,
    cancelled: CompletionStats.cancelled || 0,
  };

  let project = await Project.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$tasks", count: { $sum: 1 } } },
  ]);

  project = project
    .filter((item) => item._id.length > 0)
    .map((item) => item._id)
    .flat();

  let taskStats = await Task.aggregate([
    { $match: { _id: { $in: project } } },
    { $group: { _id: "$taskStatus", count: { $sum: 1 } } },
  ]);

  const defaultTaskStats = {
    pending: taskStats.pending || 0,
    in_progress: taskStats.in_progress || 0,
    done: taskStats.done || 0,
  };

  res
    .status(StatusCodes.OK)
    .json({ defaultTaskStats, defaultCompletionStats, statusStats });
};


const exportCSV = async (req, res) => {
  let query = {};

  if (req.user.role !== "admin") {
    query = { createdBy: req.user.userId };
  }

  // Populate the tasks, team, and createdBy fields with the corresponding data from the Task and User collections
  const projects = await Project.find(query)
    .populate({
      path: "tasks",
      select: "taskName",
    })
    .populate({
      path: "team",
      select: "firstName lastName",
    })
    .populate({
      path: "createdBy",
      select: "firstName lastName",
    })
    .sort()
    .exec();

  // Define the header labels
  const headerLabels = [
    "Project Name",
    "Tasks",
    "Team Members",
    "Project Manager",
    "Created At",
    "Planned Start",
    "Planned End",
    "Actual End",
    "Status",
  ];

  // Convert the header labels to a CSV-formatted string
  const headerRow = headerLabels.join(",") + "\n";

  // Convert the project data to a CSV-formatted string
  const csvData = projects
    .map((p) => [
      p.projectName,
      p.tasks.map((t) => t.taskName).join("; "), // join task names with a semicolon and space
      p.team.map((t) => `${t.firstName} ${t.lastName}`).join("; "), // join team members with a semicolon and space
      `${p.createdBy.firstName} ${p.createdBy.lastName}`,
      p.createdAt ? dayjs(p.createdAt).format("MM-DD-YYYY") : "",
      p.plannedStart ? dayjs(p.plannedStart).format("MM-DD-YYYY") : "",
      p.plannedEnd ? dayjs(p.plannedEnd).format("MM-DD-YYYY") : "",
      p.actualEnd ? dayjs(p.actualEnd).format("MM-DD-YYYY") : "",
      p.projectStatus,
    ])
    .join("\n");

  // Combine the header row and the project data
  const fullCsvData = headerRow + csvData;

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=Projects.csv");

  res.status(StatusCodes.OK).end(fullCsvData);
};
const exportAdminCSV = async (req, res) => {
  let query = {};

  // Fetch projects with their tasks and user data
  const projects = await Project.find(query)
    .populate({
      path: "createdBy",
      select: "firstName lastName",
    })
    .populate({
      path: "tasks",
      select: "taskStatus",
    })
    .sort()
    .exec();

  // Define the header labels
  const headerLabels = [
    "Project Manager",
    "Project Name",
    "Created At",
    "Planned Start",
    "Planned End",
    "Actual End",
    "Status",
    "Total Tasks",
    "For Approval",
    "In Progress",
    "Approved",
    "Completed",
    "Cancelled",
    "In Progress %",
    "For Approval %",
    "Approved %",
    "Completed %",
    "Cancelled %",
  ];

  // Calculate the number of tasks with each status
  const taskStatusCounts = {
    [TASK_STATUS.IN_PROGRESS]: 0,
    [TASK_STATUS.FOR_APPROVAL]: 0,
    [TASK_STATUS.APPROVED]: 0,
    [TASK_STATUS.COMPLETED]: 0,
    [TASK_STATUS.CANCELLED]: 0,
  };
  projects.forEach((project) => {
    project.tasks.forEach((task) => {
      taskStatusCounts[task.taskStatus]++;
    });
  });

  // Calculate the total number of tasks
  let totalTasks = Object.values(taskStatusCounts).reduce((a, b) => a + b, 0);
  if (totalTasks === 0) {
    totalTasks = 1; // Set totalTasks to 1 to avoid division by zero
  }

  // Calculate the percentages of tasks with each status
  const percentages = {};
  Object.keys(taskStatusCounts).forEach((status) => {
    percentages[status] = (taskStatusCounts[status] / totalTasks) * 100;
  });

  // Convert the header labels to a CSV-formatted string
  const headerRow = headerLabels.join(",") + "\n";

  // Convert the project data to a CSV-formatted string
  const csvData = projects
    .map((p) => [
      `${p.createdBy.firstName} ${p.createdBy.lastName}`,
      p.projectName,
      p.createdAt ? dayjs(p.createdAt).format("MM-DD-YYYY") : "",
      p.plannedStart ? dayjs(p.plannedStart).format("MM-DD-YYYY") : "",
      p.plannedEnd ? dayjs(p.plannedEnd).format("MM-DD-YYYY") : "",
      p.actualEnd ? dayjs(p.actualEnd).format("MM-DD-YYYY") : "",
      p.projectStatus,
      p.tasks.length,
      ...Object.values(taskStatusCounts),
      ...Object.values(percentages),
    ])
    .join("\n");

  // Combine the header row and the project data
  const fullCsvData = headerRow + csvData;

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=Projects.csv");

  res.status(StatusCodes.OK).end(fullCsvData);
};

module.exports = {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  updateProjectStatus,
  deleteProject,
  showProjectStats,
  exportCSV,
  exportAdminCSV
};
