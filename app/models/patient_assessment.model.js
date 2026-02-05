const knex = require("knex")(require("../config/dbMod.js"))
const insertPatientAssesment = (db, ptAssessmentData) => {
    return db("patients_assessments").insert(ptAssessmentData);
}

const insertPatientAllergies = (db, ptAllergiesData) => {
    return db("patients_allergies").insert(ptAllergiesData);
}

const editPtAssessment = (db, asmID, editedAsmData) => {
    return db("patients_assessments")
        .where({ id: asmID })
        .update(editedAsmData);
};


const fetchExistingAssessment = (db, asmID) => {
    return db("patients_assessments as pt_asm")
        .where({ id: asmID })
        .select(
            "pt_asm.patient_ID",
            "pt_asm.patient_complaint",
            "pt_asm.past_medical_history",
            "pt_asm.consciousness",
            "pt_asm.temperature",
            "pt_asm.breathing_rate",
            "pt_asm.systolic_bp",
            "pt_asm.diastolic_bp",
            "pt_asm.pulse")
        .first();

};


const fetchExistingPtAllergies = (db, pt_id) => {
    return db("patients_allergies").where({ patient_ID: pt_id });
};

const showPtAssessment = (asmID) => {
    return knex("patients_assessments").where({ id: asmID }).first();
};

module.exports = {
    insertPatientAssesment,
    insertPatientAllergies,
    editPtAssessment,
    fetchExistingPtAllergies,
    fetchExistingAssessment,
    showPtAssessment

}