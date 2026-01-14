const epxress = require("express");
const router = epxress.Router();
const { registerPatient,
    displaySinglePatient,
    displayPatients,
    updatePatient,
    deletePatient } = require("../controllers/patient.controller.js");
const { validatePatientData, validatePatientUpdateData } =
    require("../validations/patients.validations.js");
const authorize = require("../middleware/authorizeUser.mid.js");
const { routeAction } = require("../middleware/accessChecker.js");
router.post("/register-patient", validatePatientData, registerPatient);
router.get("/show-patients", displayPatients);
router.get("/show-patient/:id", displaySinglePatient);
router.post("/update-patient/:id", validatePatientUpdateData, updatePatient);
router.post("/delete-patient/:id", deletePatient);
module.exports = router;