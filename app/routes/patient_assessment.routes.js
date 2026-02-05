const express = require("express");
const { savePatientAssessment,
     editPatientAssessment, 
     showPatientAssessment} = require("../controllers/patient_assessment.controller");
const router = express.Router();

router.post("/save-assessment",savePatientAssessment);
router.get("/show-assessment/:asm_id",showPatientAssessment);
router.post("/edit-assessment", editPatientAssessment);

module.exports = router;