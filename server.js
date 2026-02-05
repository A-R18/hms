const express = require("express");
const app = express();
const userRoutes = require("./app/routes/user.routes.js");
const patientRoutes = require("./app/routes/patient.routes.js");
const scheduleDoctors = require("./app/routes/doctor.scheduling.routes.js");
const appointmentsRoutes = require("./app/routes/appointment.routes.js");
const patientAssessmentRoutes = require("./app/routes/patient_assessment.routes.js");
const patientDiagnosisRoutes = require("./app/routes/patient.diagnosis.routes.js");
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/hospital/users", userRoutes);
app.use("/hospital/patients", patientRoutes);
app.use("/hospital/schedule-doctors", scheduleDoctors);
app.use("/hospital/appointments", appointmentsRoutes);
app.use("/hospital/patient-assessment", patientAssessmentRoutes);
app.use("/hospital/patient-diagnosis", patientDiagnosisRoutes);
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
