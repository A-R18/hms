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
    return res.status(400).json(error);
  }
};

const displayPatients = async (req, res) => {
  try {
    const patientsShown = await showPatients();
    if (patientsShown) {
      return res.status(200).json(patientsShown);
    } else return res.status(400).json("didn't fetch patients!");
  } catch (error) {
    return res.status(400).json(error);
  }
};

const displaySinglePatient = async (req, res) => {
  try {
    const id = req.params.id;
    const patientShown = await showSinglePatient(id);
    if (patientShown) {
      return res.status(200).json({ message: "patient fetched", ...patientShown });
    } else return res.status(400).json("didn't fetch patient!");
  } catch (error) {
    return res.status(400).json(error);
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
    return res.status(400).json(error);
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
    return res.status(400).json(error);
  }
};

module.exports = {
  registerPatient,
  displaySinglePatient,
  displayPatients,
  updatePatient,
  deletePatient,
};