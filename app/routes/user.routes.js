const express = require("express");
const router = express.Router();
const {
  registerUser,
  showUsers,
  updateUser,
  deleteUser,
  showSpecificUser,
} = require("../controllers/user.controller.js");
const { logUserIn } = require("../controllers/login.controller.js");
const authorize = require("../middleware/authorizeUser.mid.js")
const { validateUserData, validateUpdatedUser } = require("../validations/users.validations.js");
router.post("/register", authorize, validateUserData, registerUser);
router.get("/show-all", authorize, showUsers);
router.post("/update-user/:id", authorize, validateUpdatedUser, updateUser);
router.post("/delete-user/:id", authorize, deleteUser);
router.get("/show-currentUser/:id", authorize, showSpecificUser);
router.post("/login-user", logUserIn);
module.exports = router;