const express = require("express");
const router = express();
const {
    getAllProjects,
    getSingleProject,
    createProject,
    updateProject,
    updateProjectStatus,
    deleteProject,
    showProjectStats,
    exportCSV,
    exportAdminCSV
} = require('../controllers/ProjectController')
const {
    validateProject,
    validateProjectIdParam,     
} = require ('../middleware/validationMiddleware')
const {authorizePermission,isProjectManager} = require("../middleware/authMiddleware")



//get all projects
router.get('/',getAllProjects)

//export projects to csv
router.get('/export',exportCSV)

router.get('/admin/export',[authorizePermission('admin'),exportAdminCSV])

//show Project Stats
router.get('/stats',showProjectStats)


//get a single project
router.get('/:id',validateProjectIdParam,getSingleProject)

//create a new project
router.post('/',validateProject,[[isProjectManager(true)]||authorizePermission('admin'),createProject])

//update a project data
router.patch('/:id',validateProjectIdParam,[[isProjectManager(true)]||authorizePermission('admin'),updateProject])

//update a project status
router.patch('/status/:id',validateProjectIdParam,[[isProjectManager(true)]||authorizePermission('admin'),updateProjectStatus])

//delete a project
router.delete('/:id',validateProjectIdParam,[[isProjectManager(true)]||authorizePermission('admin'),deleteProject])

module.exports = router;
