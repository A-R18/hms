const express = require("express");
const app = express();
const userRoutes = require("./app/routes/user.routes.js");
const patientRoutes = require("./app/routes/patient.routes.js");
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use("/hospital/users", userRoutes);
app.use("/hospital/patients", patientRoutes);
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
