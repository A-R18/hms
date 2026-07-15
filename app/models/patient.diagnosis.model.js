const knex = require("knex")(require("../config/dbMod.js"));

const insertDocDiagnosis = (db, diagnosisData) => {
  return db("doctors_prescriptions").insert(diagnosisData);
};

const insertTravelAdvData = (db, travelData) => {
  return db("doctors_travel_advisory_to_patients").insert(travelData);
};

const editDocDiagnosis = (db, diagnosisID, editeddiagnosisData) => {
  return db("doctors_prescriptions")
    .where({ id: diagnosisID })
    .update(editeddiagnosisData);
};

const editTravelAdvData = (db, travelAdvID, editedtravelAdvData) => {
  return db("doctors_travel_advisory_to_patients")
    .where({ id: travelAdvID })
    .update(editedtravelAdvData);
};

const fetchptDiagnosis = (diagID) => {
  return knex("doctors_prescriptions")
    .join("patients as p", "doctors_prescriptions.patient_ID", "p.id")
    .join(
      "patients_assessments as pa",
      "doctors_prescriptions.appointment_ID",
      "pa.appointment_ID",
    )
    .where("doctors_prescriptions.id", diagID)
    .select("doctors_prescriptions.*", "p.*", "pa.*");
};

const fetchExistingTravData = (travAdvId) => {
  return knex("doctors_travel_advisory_to_patients")
    .where({ id: travAdvId })
    .select("*");
};

module.exports = {
  insertDocDiagnosis,
  insertTravelAdvData,
  editDocDiagnosis,
  editTravelAdvData,
  fetchptDiagnosis,
  fetchExistingTravData,
};
