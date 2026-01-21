const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorizeUser.mid.js");
const { showDays } = require("../controllers/doctorScheduling.controller.js");


router.get("/show-days", authorize, showDays);


module.exports = router;