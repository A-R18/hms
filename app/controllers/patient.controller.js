const knex = require("knex")(require("../config/dbMod.js"));
const { validationResult } = require("express-validator");
const {
  addPatient,
  showSinglePatient,
  showPatients,
  fetchExistingPatient,
  updatePt,
  deletePt,
} = require("../models/patient.model.js");
const { totalPatients } = require("../models/user.model.js");

const registerPatient = async (req, res) => {
  try {
    const validatedResult = validationResult(req);
    if (!validatedResult.isEmpty()) {
      return res
        .status(400)
        .json({ message: "validations errors", errors: validatedResult.array() });
    }
    const enteredPatient = req.body;
    const patientDataMatch = {
      patient_name: enteredPatient.p_name,
      condition: enteredPatient.p_condition,
      contact: enteredPatient.p_contact,
    };
    const patientSubmitted = await addPatient(patientDataMatch);
    if (patientSubmitted) {
      return res.status(200).json("successfully submitted patient!");
    } else return res.status(400).json("didn't submit patient!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const displayPatients = async (req, res) => {
  try {
    const [{ count }] = await totalPatients;
    let page;
    const firstPage = 1;
    const limit = 5;
    const lastPage = Math.ceil(count / limit);

    if (req.query.firstPage) {
      page = firstPage;
    } else if (req.query.lastPage) {
      page = lastPage;
    } else if (!req.query.page) {
      page = 1;
    } else if (req.query.page > lastPage || req.query.page < 1) {
      return res.json({ alert: "invalid page selected!" });
    } else if (req.query.page) {
      page = req.query.page;
    }
    // req.body.lastPage?page =
    console.log("Total patients are ", count);
    const offset = (page - 1) * limit;
    console.log(offset);
    const patientsShown = await showPatients(limit, offset);
    if (patientsShown) {
      return res.status(200).json({ totalUsers: count, currentPage: page, patientsShown });
    } else return res.status(400).json("didn't fetch patients!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const displaySinglePatient = async (req, res) => {
  try {
    const id = req.params.id;
    const patientShown = await showSinglePatient(id);
    if (patientShown) {
      return res.status(200).json({ message: "patient fetched", patientShown });
    } else return res.status(400).json("didn't fetch patient!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const updatePatient = async (req, res) => {
  try {
    const validatedResult = validationResult(req);
    if (!validatedResult.isEmpty()) {
      return res
        .status(400)
        .json({ message: "validations errors", errors: validatedResult.array() });
    }
    const incomingData = req.body;
    const id = req.params.id;
    const existingPatientData = await fetchExistingPatient(id);
    const updatedPtData = {
      patient_name: req?.body?.p_name ? incomingData.p_name : existingPatientData.patient_name,

      condition: req?.body?.p_condition ? incomingData.p_condition : existingPatientData.user_email,

      contact: req?.body?.p_contact ? incomingData.p_contact : existingPatientData.contact,
    };
    const updatedPatient = await updatePt(id, updatedPtData);
    if (updatedPatient) {
      return res.status(200).json("successfully updated patient!");
    } else return res.status(400).json("didn't delete patient!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const deletePatient = async (req, res) => {
  const id = req.params.id;
  try {
    const patientDeleted = await deletePt(id);
    if (patientDeleted) {
      return res.status(200).json("successfully deleted patient!");
    } else return res.status(400).json("didn't delete patient!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  registerPatient,
  displaySinglePatient,
  displayPatients,
  updatePatient,
  deletePatient,
};
