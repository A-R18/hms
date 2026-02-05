const knex = require("knex")(require("../config/dbMod.js"));

const insertDocDiagnosis = (db, diagnosisData) => {
    return db("doctors_prescriptions").insert(diagnosisData);
};

const insertTravelAdvData = (db, travelData) => {
    return db("doctors_travel_advisory_to_patients").insert(travelData);
};

const editDocDiagnosis = (db, diagnosisID, editeddiagnosisData) => {
    return db("doctors_prescriptions").where({ id: diagnosisID })
        .update(editeddiagnosisData);
};

const editTravelAdvData = (db, travelAdvID, editedtravelAdvData) => {
    return db("doctors_travel_advisory_to_patients").where({ id: travelAdvID })
        .update(editedtravelAdvData);
}

const fetchptDiagnosis = (diagID) => {
    return knex("doctors_prescriptions").where({ id: diagID }).select("*");
}

module.exports = {
    insertDocDiagnosis,
    insertTravelAdvData,
    editDocDiagnosis,
    editTravelAdvData,
    fetchptDiagnosis
};
