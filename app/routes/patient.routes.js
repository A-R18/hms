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

router.post("/register-patient", authorize, routeAction("CREATE", "doctors"), validatePatientData, registerPatient);
router.get("/show-patients", authorize, routeAction("READ", "doctors"), displayPatients);
router.get("/show-patient/:id", authorize, routeAction("READ", "doctors"), displaySinglePatient);
router.post("/update-patient/:id", authorize, routeAction("UPDATE", "doctors"), validatePatientUpdateData, updatePatient);
router.post("/delete-patient/:id", authorize, routeAction("DELETE", "doctors"), deletePatient);
module.exports = router;