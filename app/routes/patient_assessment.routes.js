const express = require("express");
const { savePatientAssessment,
     editPatientAssessment } = require("../controllers/patient_assessment.controller");
const router = express.Router();

router.post("/save-assessment",savePatientAssessment);
// router.post("/show-assessment",)
router.post("/edit-assessment", editPatientAssessment);

module.exports = router;