const dayjs = require("dayjs");
const { insertPatientAssesment,
     insertPatientAllergies,
     editPtAssessment,
     fetchExistingAssessment,
     fetchExistingPtAllergies,
     showPtAssessment } = require("../models/patient_assessment.model.js");

const knex = require("knex")(require("../config/dbMod.js"));
const savePatientAssessment = async (req, res) => {
    const tranx = await knex.transaction();
    try {
        const incomingData = req.body;
        const assessDataMatch = {
            patient_ID: incomingData.pt_id,
            treating_doctor_ID: incomingData.treat_doc_id,
            appointment_ID: incomingData.apt_id,
            patient_complaint: incomingData.pt_complaint,
            past_medical_history: incomingData.past_md_history,
            consciousness: incomingData.coscs,
            temperature: incomingData.temp,
            systolic_bp: incomingData.s_bp,
            diastolic_bp: incomingData.d_bp,
            pulse: incomingData.h_pulse,
            breathing_rate: incomingData.b_rate

        }
        if (incomingData.pt_allergies === null) {
            const ptAssesmentSaved = await insertPatientAssesment(knex, assessDataMatch);
            if (ptAssesmentSaved) {
                return res.status(200).json({ message: "assessment saved successfully!" });
            } else {
                return res.status(400).json({ message: "DB error, can't save!" });
            }
        } else {
            let allergiesDataMatch = {};
            let checkArray = [];
            await insertPatientAssesment(tranx, assessDataMatch);
            for (const allergy of incomingData.pt_allergies) {

                allergiesDataMatch = {
                    patient_ID: incomingData.pt_id,
                    allergy_ID: allergy
                }
                const allergySubmitted = await insertPatientAllergies(tranx, allergiesDataMatch);
                checkArray.push(allergySubmitted);
            }
            await tranx.commit()

            if (incomingData.pt_allergies.length === checkArray.length) {
                return res.status(200).json({ message: "assessment saved successfully!" });
            } else {
                return res.status(400).json({ message: "DB error, can't save!" });
            }

        }

    } catch (error) {
        await tranx.rollback();
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ alert: "you can't enter assessment twice!" });
        }
        return res.status(400).json({ error: error.message });
    }

}


const editPatientAssessment = async (req, res) => {
    const tranx = await knex.transaction();

    try {
        const editedAsmData = req.body;
        const assessmentID = editedAsmData.asm_id;
        const assessmentFetched = await fetchExistingAssessment(knex, assessmentID);
        let ptAllergiesFetched;
        if (editedAsmData.pt_allergies !== null) {
            ptAllergiesFetched = await fetchExistingPtAllergies(knex, assessmentFetched.patient_ID);
        }
        if (assessmentFetched) {
            const editedAsmDataMatch = {
                patient_complaint: req?.body?.pt_complaint
                    ? editedAsmData.pt_complaint
                    : assessmentFetched.patient_complaint,

                past_medical_history: req?.body?.past_md_history
                    ? editedAsmData.past_md_history
                    : assessmentFetched.past_medical_history,

                consciousness: req?.body?.coscs
                    ? editedAsmData.coscs
                    : assessmentFetched.consciousness,

                temperature: req?.body?.temp
                    ? editedAsmData.temp
                    : assessmentFetched.temperature,

                systolic_bp: req?.body?.s_bp
                    ? editedAsmData.s_bp
                    : assessmentFetched.systolic_bp,

                diastolic_bp: req?.body?.d_bp
                    ? editedAsmData.d_bp
                    : assessmentFetched.diastolic_bp,

                pulse: req?.body?.h_pulse
                    ? editedAsmData.h_pulse
                    : assessmentFetched.pulse,

                breathing_rate: req?.body?.b_rate
                    ? editedAsmData.b_rate
                    : assessmentFetched.breathing_rate
            };
            console.log("Allergies are: ", req.body.pt_allergies);
            if (req.body.pt_allergies === null) {
                await editPtAssessment(knex, assessmentID, editedAsmDataMatch);
                return res.status(400).json({ message: "assessment edited successfully" });
            } else {

                let allergiesDataMatch;
                await editPtAssessment(tranx, assessmentID, editedAsmDataMatch);
                for (const allergy of req.body.pt_allergies) {
                    console.log(allergy);
                    allergiesDataMatch = {
                        patient_ID: assessmentFetched.patient_ID,
                        allergy_ID: allergy
                    }
                    await insertPatientAllergies(tranx, allergiesDataMatch);
                }
                await tranx.commit();
            }

        } else {
            return res.status(401).json({ error: "DB error, can't update" });
        }
    } catch (error) {
        await tranx.rollback();
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ alert: "Same allergy entry again for same patient is not allowed!" });
        }
        return res.status(400).json({ error: error.message });
    }
    //allergy already exists!
    /* this check is required to be added while editing the patient allergies so that existing allergies are not required to be deleted! */
}


const showPatientAssessment = async (req, res) => {
    try {
        const assessmentID = req.params.asm_id;
        const patientAssessmentShown = await showPtAssessment(assessmentID);
        const formattedTime = dayjs(patientAssessmentShown.assessment_time).format("ddd, MMM DD YYYY,  hh:mm A");
        delete patientAssessmentShown.assessment_time;
        patientAssessmentShown.assessment_time = formattedTime;
        if (patientAssessmentShown) {
            return res.status(200).json(patientAssessmentShown);
        } else {
            return res.status(401).json({ error: "DB error, can't show" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    savePatientAssessment,
    editPatientAssessment,
    showPatientAssessment
}