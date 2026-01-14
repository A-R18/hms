const knex = require("knex")(require("../config/dbMod.js"));

const addPatient = (patientData) => {
    return knex("patients").insert(patientData);

}

const showSinglePatient = (patientID) => {
    return knex("patients").where({ id: patientID }).select("patients.patient_name", "patients.condition", "patients.contact").first();

}

const fetchExistingPatient = (patientID) => {
    return knex("patients").where({ id: patientID }).select("patients.patient_name", "patients.condition", "patients.contact").first();

}

const showPatients = () => {
    return knex("patients").select("patients.id","patients.patient_name", "patients.condition", "patients.contact");
}

const updatePt = (patientID, updatedPatient) => {
    return knex("patients").where({ id: patientID }).update(updatedPatient);
}

const deletePt = (patientID) => {
    return knex("patients").where({ id: patientID }).delete();
}

module.exports = { addPatient, showSinglePatient, showPatients, fetchExistingPatient, updatePt, deletePt };

