const express = require('express');
const router = express.Router();
const {
  registerUser,
  showUsers,
  updateUser,
  deleteUser,
  showSpecificUser,
} = require('../controllers/user.controller.js');
const { logUserIn } = require('../controllers/login.controller.js');
router.post('/register', registerUser);
router.get('/show-all', showUsers);
router.post('/update-user/:id', updateUser);
router.post('/delete-user/:id', deleteUser);
router.get('/show-currentUser/:id', showSpecificUser);
router.post('/login-user', logUserIn);
module.exports = router;
