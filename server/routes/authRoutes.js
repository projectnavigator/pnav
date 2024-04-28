const express = require("express");
const router = express();
const { registerUser, loginUser,logoutUser} = require("../controllers/authController");
const { validateRegisterInput, validateLoginInput } = require("../middleware/validationMiddleware");
const {authorizePermission,authenticateUser} = require("../middleware/authMiddleware")




router.post("/register",validateRegisterInput,[registerUser]);
router.post("/login",validateLoginInput, loginUser);
router.get("/logout", logoutUser);


module.exports = router;
