const express = require("express");
const router = express.Router();
const {
  savePatientAssessment,
  editPatientAssessment,
  showPatientAssessment,
} = require("../controllers/patient_assessment.controller");

router.post("/save-assessment", savePatientAssessment);
router.get("/show-assessment/:asm_id", showPatientAssessment);
router.post("/edit-assessment", editPatientAssessment);

module.exports = router;
