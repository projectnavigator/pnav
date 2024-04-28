const { body, param, validationResult } = require("express-validator");
const {
  PROJECT_STATUS,
  TASK_PRIORITY,
  TASK_STATUS,
} = require("../utils/constants");
const mongoose = require("mongoose");
const Project = require("../models/ProjectSchema");
const Tasks = require("../models/TaskSchema");
const Users = require("../models/UserSchema");
const { BadRequestError } = require("../errors/customeErrors");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/UserSchema");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (
          errorMessages[0].startsWith("Task does not" || "Project does not")
        ) {
          return res.status(StatusCodes.NOT_FOUND).json({ errorMessages });
        } else if (errorMessages[0].startsWith("Unauthorize")) {
          return res.status(StatusCodes.UNAUTHORIZED).json({ errorMessages });
        } else if (errorMessages[0].startsWith("Not authorized")) {
          return res.status(StatusCodes.FORBIDDEN).json({ errorMessages });
        }
        return res.status(StatusCodes.BAD_REQUEST).json({ errorMessages });
      }
      next();
    },
  ];
};

const validateProject = withValidationErrors([
  body("projectName").notEmpty().withMessage("Project Name is required").trim(),
  body("plannedStart")
    .notEmpty()
    .withMessage("You must indicate your planned start date")
    .custom(async (plannedStart, { req }) => {
      const plandate = dayjs(plannedStart).format("MM/DD/YYYY");
      const today = dayjs().format("MM/DD/YYYY");
      if (!dayjs(today).isSameOrBefore(plandate)) {
        throw new Error("You must indicate a date in the future");
      }
    }),
  body("plannedEnd")
    .notEmpty()
    .withMessage("You must indicate your deadline for this project")
    .custom(async (plannedEnd, { req }) => {
      const plandate = dayjs(req.body.plannedStart).format("MM/DD/YYYY");
      const enddate = dayjs(plannedEnd).format("MM/DD/YYYY");
      if (dayjs(enddate).isSameOrBefore(plandate) === true) {
        throw new Error("You must indicate the deadline date in the future");
      }
    })
    ,
  body("team")
    .notEmpty()
    .withMessage("You must assign a team for this project"),
]);

const validateTask = withValidationErrors([
  body("taskName").notEmpty().withMessage("Task name is required"),
  body("project").notEmpty().withMessage("Project is required"),
  body("priority")
    .isIn(Object.values(TASK_PRIORITY))
    .withMessage("Invalid priority value"),
  body("assignedUser").notEmpty().withMessage("Assignee is required"),
  body("taskStatus")
    .isIn(Object.values(TASK_STATUS))
    .withMessage("Invalid status value"),
]);

const validateProjectIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new Error("invalid MongoDB Id");

    const project = await Project.findById(value);
    if (!project) throw new Error("Project does not exists");

    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === project.createdBy.toString();
    if (!isAdmin && !isOwner) {
      throw new Error("Unauthorized to access this feature");
    }
  }),
]);

const validateTaskIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new Error("invalid MongoDB Id");

    const task = await Tasks.findById(value);
    if (!task) throw new Error("Task does not exists");

    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === task.createdBy.toString();
    if (!isAdmin && !isOwner) {
      throw new Error("Unauthorized to access this feature");
    }
  }),
]);

const validateUserIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new Error("invalid MongoDB Id");

    const user = await User.findById(value);
    if (!user) throw new Error("User does not exists");

    const isAdmin = req.user.role === "admin";
    if (!isAdmin) {
      throw new Error("Unauthorized to access this feature");
    }
  }),
]);

const validateRegisterInput = withValidationErrors([
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email format")
    .custom(async (email) => {
      const user = await Users.findOne({ email });

      if (user) throw new BadRequestError("Email already exists!");
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters long"),
]);

const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email format"),
  body("password").notEmpty().withMessage("Password is required"),
]);

const validateUserUpdateInput = withValidationErrors([
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email")
    .notEmpty()
    .withMessage("Invalid priority value")
    .isEmail()
    .withMessage("Invalid Email format")
    .custom(async (email, { req }) => {
      const user = await Users.findOne({ email });

      if (user && user._id.toString() !== req.user.userId)
        throw new BadRequestError("Email already exists!");
    }),
]);

module.exports = {
  validateProject,
  validateProjectIdParam,
  validateTaskIdParam,
  validateTask,
  validateRegisterInput,
  validateLoginInput,
  validateUserUpdateInput,
  validateUserIdParam,
};
