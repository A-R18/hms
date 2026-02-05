const express = require("express");
const { savePatientDiagnosis,
    editPatientDiagnosis,
    showPatientDiagnosis } = require("../controllers/patient.diagnosis.controller");
const router = express.Router();

router.post("/write-diagnosis", savePatientDiagnosis);
router.post("/edit-diagnosis", editPatientDiagnosis);
router.get("/show-diagnosis/:diagnosis_id", showPatientDiagnosis);

module.exports = router;
