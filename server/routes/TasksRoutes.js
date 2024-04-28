const express = require("express");
const router = express();
const {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
  getAllUserTask
} = require("../controllers/TaskController");
const {validateTask,validateTaskIdParam} = require ("../middleware/validationMiddleware") 
const {authorizePermission,isProjectManager} = require("../middleware/authMiddleware")


//get all Tasks
router.get("/", getAllTasks);

//get all Tasks
router.get("/owntask", getAllUserTask);

//get a single Task
router.get("/:id",validateTaskIdParam, getSingleTask);

//create a new Task
router.post("/",validateTask, [isProjectManager(true),createTask]);

//update a Task data
router.patch("/:id",validateTaskIdParam, [isProjectManager(true),updateTask]);

//delete a Task
router.delete("/:id",validateTaskIdParam,[isProjectManager(true),deleteTask]);

module.exports = router;
