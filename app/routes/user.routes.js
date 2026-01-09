const express = require("express");
const router = express.Router();
const {
  registerUser,
  showUsers,
  updateUser,
  deleteUser,
  showSpecificUser
} = require("../controllers/user.controller.js");
const { logUserIn } = require("../controllers/login.controller.js");
const authorize = require("../middleware/authorizeUser.mid.js");
const { validateUserData,
  validateUpdatedUser } = require("../validations/users.validations.js");
const { routeAction } = require("../middleware/accessChecker.js");
//Route written for registering a user:
router.post("/register", authorize, routeAction("CREATE", "users"), validateUserData, registerUser);

//Route written for showing user:
router.get("/show-all", authorize, routeAction("READ", "users"), showUsers);

//Route written for updating a user:
router.post("/update-user/:id", authorize, routeAction("UPDATE", "users"), validateUpdatedUser, updateUser);

//Route written for deleting a user:
router.post("/delete-user/:id", authorize, routeAction("DELETE", "users"), deleteUser);

//Route written for showing a current user:
router.get("/show-currentUser/:id", authorize, routeAction("READ", "users"), showSpecificUser);

//Route written for user's login:
router.post("/login-user", logUserIn);

module.exports = router;