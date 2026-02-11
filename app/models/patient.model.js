const knex = require("knex")(require("../config/dbMod.js"));

const addPatient = (patientData) => {
  return knex("patients").insert(patientData);
};

const showSinglePatient = (patientID) => {
  return knex("patients")
    .where({ id: patientID })
    .select("patients.id", "patients.patient_name", "patients.condition", "patients.contact")
    .first();
};

const fetchExistingPatient = (patientID) => {
  return knex("patients")
    .where({ id: patientID })
    .select("patients.patient_name", "patients.condition", "patients.contact")
    .first();
};

const showPatients = (givenLimit, givenOffset) => {
  return knex("patients")
    .select("patients.id", "patients.patient_name", "patients.condition", "patients.contact")
    .limit(givenLimit)
    .offset(givenOffset);
};

const updatePt = (patientID, updatedPatient) => {
  return knex("patients").where({ id: patientID }).update(updatedPatient);
};

const deletePt = (patientID) => {
  return knex("patients").where({ id: patientID }).delete();
};


const fetchPatientAllergies = ()=>{
return knex("allergies").select("allergies.id", "allergies.allergy_name");
}

const readAllPtAllergies = (ptID)=>{
  return knex("patients_allergies").join("allergies","patients_allergies.allergy_ID", "allergies.id").where("patients_allergies.patient_ID", ptID).select("allergies.allergy_name");
}

module.exports = {
  addPatient,
  showSinglePatient,
  showPatients,
  fetchExistingPatient,
  updatePt,
  deletePt,
  fetchPatientAllergies,
  readAllPtAllergies
};
