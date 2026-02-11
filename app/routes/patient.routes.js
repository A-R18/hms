const epxress = require("express");
const router = epxress.Router();
const {
  registerPatient,
  displaySinglePatient,
  displayPatients,
  updatePatient,
  deletePatient,
  showPatientAllergies,
  showPtSpecificAllergies,
} = require("../controllers/patient.controller.js");

const {
  validatePatientData,
  validatePatientUpdateData,
} = require("../validations/patients.validations.js");

const authorize = require("../middleware/authorizeUser.mid.js");

const { routeAction } = require("../middleware/accessChecker.js");
const { showSpecificUser } = require("../controllers/user.controller.js");

router.post(
  "/register-patient",
  authorize,
  routeAction("CREATE", "doctors"),
  validatePatientData,
  registerPatient
);
router.get("/show-patients", authorize, routeAction("READ", "doctors"), displayPatients);
router.get("/show-patient/:id", authorize, routeAction("READ", "doctors"), displaySinglePatient);
router.post(
  "/update-patient/:id",
  authorize,
  routeAction("UPDATE", "doctors"),
  validatePatientUpdateData,
  updatePatient
);
router.post("/delete-patient/:id", authorize, routeAction("DELETE", "doctors"), deletePatient);

router.get("/show-allergies", showPatientAllergies);
router.get("/show-patient-allergies/:pt_id", showPtSpecificAllergies);

module.exports = router;
