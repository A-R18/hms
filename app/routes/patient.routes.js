const epxress = require("express");
const router = epxress.Router();
const { registerPatient, displaySinglePatient, displayPatients, updatePatient, deletePatient } = require("../controllers/patient.controller.js");

router.post("/register-patient", registerPatient);
router.get("/show-patients", displayPatients);
router.get("/show-patient/:id", displaySinglePatient);
router.post("/update-patient/:id", updatePatient);
router.post("/delete-patient/:id", deletePatient);
module.exports = router;