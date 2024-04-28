const express = require("express");
const router = express();
const {getApplicationStatus,getCurrentUser,getAllUser,getSpecificUser,updateUser,deleteUser,getUserById} = require("../controllers/userController");
const {validateUserUpdateInput, validateUserIdParam}  = require("../middleware/validationMiddleware");
const {authorizePermission,authenticateUser} = require("../middleware/authMiddleware")

router.get("/current-user",getCurrentUser);
router.get("/specific-user",getSpecificUser);
router.get("/all-user",getAllUser);
router.get("/:id",getUserById);
router.get("/admin/app-stats",[authorizePermission('admin'),getApplicationStatus,]);
router.patch("/update-user/",validateUserUpdateInput, updateUser);
router.delete("/delete-user/:id",[authorizePermission('admin'),deleteUser]);


module.exports = router;
