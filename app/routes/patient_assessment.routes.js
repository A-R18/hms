const express = require("express");
const router = express.Router();
const {
  savePatientAssessment,
  editPatientAssessment,
  showPatientAssessment,
} = require("../controllers/patient_assessment.controller");
const { routeAction } = require("../middleware/accessChecker");
const authorize = require("../middleware/authorizeUser.mid.js")


router.post("/save-assessment", authorize, routeAction("CREATE", "assessment"), savePatientAssessment);
router.get("/show-assessment/:asm_id", authorize, routeAction("READ", "assessment"), showPatientAssessment);
router.post("/edit-assessment", authorize, routeAction("UPDATE", "assessment"), editPatientAssessment);

module.exports = router;
