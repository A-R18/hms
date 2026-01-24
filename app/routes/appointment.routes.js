const express = require("express");
const router = express.Router();
const { createAppointment,
        changeAppointment,
        deleteAppointment,
        showAppointment } = require("../controllers/appointment.controller.js");
        
router.post("/create-appointment/:doc_id", createAppointment);
router.post("/edit-appointment/:id", changeAppointment);
router.post("/delete-appointment/:id", deleteAppointment);
router.get("/show-appointment/:doc_id", showAppointment);

module.exports = router ;