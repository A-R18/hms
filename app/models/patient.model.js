const knex = require("knex")(require("../config/dbMod.js"));

const addPatient = (patientData) => {
    return knex("patients").insert(patientData);

}

const showSinglePatient = () => {
  
}

const showPatients = () => {
return knex("patients").select("patients.name","patients.condition",  "patients.contact");
}

const updatePt = () => {

}

const deletePt = (patientID) => {
return knex("patients").where({id: patientID}).delete();
}

module.exports = { addPatient, showSinglePatient, showPatients, updatePt, deletePt };

