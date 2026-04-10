const express = require("express");
const router = express.Router();
const {
  createAppointment,
  changeAppointment,
  deleteAppointment,
  showAppointment,
  saveAppointment,
  showDocSpecificAppointments,
  staffChangesAptStatus,
  docChangesAptStatus,
} = require("../controllers/appointment.controller.js");

const { routeAction } = require("../middleware/accessChecker.js");
const authorize = require("../middleware/authorizeUser.mid.js");

router.post(
  "/create-appointment",
  authorize,
  routeAction("CREATE", "scheduling"),
  createAppointment
);

router.post("/save-appointment", authorize, routeAction("CREATE", "scheduling"), saveAppointment);

router.post(
  "/edit-appointment/:id",
  authorize,
  routeAction("UPDATE", "scheduling"),
  changeAppointment
);

router.post(
  "/delete-pending-appointment",
  authorize,
  routeAction("DELETE", "scheduling"),
  deleteAppointment
);

router.get("/show-appointments", authorize, routeAction("READ", "scheduling"), showAppointment);

router.post(
  "/reschedule-appointment",
  authorize,
  routeAction("UPDATE", "scheduling"),
  changeAppointment
);

router.get(
  "/show-doctor-specific-appointments/:doc_id",
  authorize,
  routeAction("READ", "scheduling"),
  showDocSpecificAppointments
);

router.post(
  "/staff-change-apt-status",
  authorize,
  routeAction("UPDATE", "scheduling"),
  staffChangesAptStatus
);

router.post(
  "/doc-change-apt-status",
  authorize,
  routeAction("UPDATE", "patients_diagnosis"),
  docChangesAptStatus
);

module.exports = router;
