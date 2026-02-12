const express = require("express");
const { savePatientDiagnosis,
    editPatientDiagnosis,
    showPatientDiagnosis } = require("../controllers/patient.diagnosis.controller");
const router = express.Router();
const { routeAction } = require("../middleware/accessChecker.js");
const authorize = require("../middleware/authorizeUser.mid.js");

router.post("/write-diagnosis", authorize, routeAction("CREATE", "patients_diagnosis"), savePatientDiagnosis);

router.post("/edit-diagnosis", authorize, routeAction("UPDATE", "patients_diagnosis"), editPatientDiagnosis);

router.get("/show-diagnosis/:diagnosis_id", authorize, routeAction("READ", "patients_diagnosis"), showPatientDiagnosis);

module.exports = router;
