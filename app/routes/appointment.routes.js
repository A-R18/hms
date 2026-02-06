const express = require("express");
const router = express.Router();
const {
  createAppointment,
  changeAppointment,
  deleteAppointment,
  showAppointment,
  saveAppointment,
  showDocSpecificAppointments,
} = require("../controllers/appointment.controller.js");

router.post("/create-appointment", createAppointment);
router.post("/save-appointment", saveAppointment);
router.post("/edit-appointment/:id", changeAppointment);
router.post("/delete-pending-appointment", deleteAppointment);
router.get("/show-appointments", showAppointment);
router.post("/reschedule-appointment", changeAppointment);
router.get("/show-doctor-specific-appointments/:doc_id", showDocSpecificAppointments);

// router.get("/show-appointment/:doc_id");

module.exports = router;
