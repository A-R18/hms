const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorizeUser.mid.js");
const {
  showDays,
  saveDoctorSchedule,
  showDoctorSchedule,
  deleteDoctorSchedule,
  changeDoctorSchedule,
} = require("../controllers/doctorScheduling.controller.js");
const { routeAction } = require("../middleware/accessChecker.js");

router.get("/show-days", authorize, routeAction("READ", "doctors"), showDays);

router.post(
  "/save-doctor-timetable",
  authorize,
  routeAction("CREATE", "doctors"),
  saveDoctorSchedule
);
router.get(
  "/show-doctor-timetable/:id",
  authorize,
  routeAction("READ", "doctors"),
  showDoctorSchedule
);
router.post(
  "/delete-doctor-timetable/:id",
  authorize,
  routeAction("DELETE", "doctors"),
  deleteDoctorSchedule
);
router.post(
  "/edit-doctor-timetable",
  authorize,
  routeAction("UPDATE", "doctors"),
  changeDoctorSchedule
);

module.exports = router;
