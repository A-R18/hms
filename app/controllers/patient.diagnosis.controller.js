const knex = require("knex")(require("../config/dbMod.js"));
const {
  insertDocDiagnosis,
  insertTravelAdvData,
  editDocDiagnosis,
  editTravelAdvData,
  fetchptDiagnosis,
  fetchExistingTravData,
} = require("../models/patient.diagnosis.model");
const { insertPatientAllergies } = require("../models/patient_assessment.model.js");

const savePatientDiagnosis = async (req, res) => {
  try {
    const tranx = await knex.transaction();
    const incomingDiagnosis = req.body;
    let travelAdvDataMatch = {};
    const diagnosisDataMatch = {
      doctor_ID: incomingDiagnosis.tr_doc_id,
      patient_ID: incomingDiagnosis.pt_id,
      appointment_ID: incomingDiagnosis.apt_id,
      doctor_note: incomingDiagnosis.doc_note,
      treatment_plan: incomingDiagnosis.treat_plan,
      other_examinations: incomingDiagnosis.other_exm,
    };
    if (incomingDiagnosis.travel_advData !== null) {
      travelAdvDataMatch = {
        travel_recommendation: incomingDiagnosis.trav_reccom,
        travel_requirement: incomingDiagnosis.trav_req,
        travelling_company_required: incomingDiagnosis.trav_comp_req,
      };
    }

    const ptAllergiesDataMatch = {};
    if (incomingDiagnosis.travel_advData !== null && incomingDiagnosis.patient_Allergies === null) {
      await insertDocDiagnosis(tranx, diagnosisDataMatch);
      await insertTravelAdvData(tranx, travelAdvDataMatch);

      (await tranx).commit();
      return res.status(200).json({ message: "Diagnosis & Travel advisory saved!" });
    } else if (
      incomingDiagnosis.travel_advData === null &&
      incomingDiagnosis.patient_Allergies !== null
    ) {
      let allergiesDataMatch = {};
      await insertDocDiagnosis(tranx, diagnosisDataMatch);
      for (const allergy of incomingDiagnosis.patient_Allergies) {
        allergiesDataMatch = {
          patient_ID: incomingDiagnosis.pt_id,
          allergy_ID: allergy,
        };
        await insertPatientAllergies(tranx, allergiesDataMatch);
      }
      (await tranx).commit();
      return res.status(200).json({ message: "Diagnosis & Patient allergies saved!" });
    } else if (
      incomingDiagnosis.travel_advData !== null &&
      incomingDiagnosis.patient_Allergies !== null
    ) {
      let allergiesDataMatch = {};
      await insertDocDiagnosis(tranx, diagnosisDataMatch);
      await insertTravelAdvData(tranx, travelAdvDataMatch);
      for (const allergy of incomingDiagnosis.patient_Allergies) {
        allergiesDataMatch = {
          patient_ID: incomingDiagnosis.pt_id,
          allergy_ID: allergy,
        };
        await insertPatientAllergies(tranx, allergiesDataMatch);
      }

      (await tranx).commit();
      return res
        .status(200)
        .json({ message: "Diagnosis, Travel advisory & Patient allergies saved!" });
    } else if (
      incomingDiagnosis.travel_advData === null &&
      incomingDiagnosis.patient_Allergies === null
    ) {
      await insertDocDiagnosis(knex, diagnosisDataMatch);
      return res.status(200).json({ message: "Diagnosis saved!" });
    }
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({ alert: "Same allergy entry again for same patient is not allowed!" });
    } else return res.status(400).json({ error: error.message });
  }
};

const editPatientDiagnosis = async (req, res) => {
  try {
    console.log("Allergies data: \n");
    const diagnosisID = req.body.diag_id;
    const travAdvID = req?.body?.travAdv_id;
    if (!diagnosisID) {
      return res.status(404).json({ alert: "No diagnosis refrence provided!" });
    }
    let travelAdvExistingData = undefined;

    if (req.body.travel_advData) {
      travelAdvExistingData = await fetchExistingTravData(travAdvID);
    }

    let ExistingDiagnosisData = await fetchptDiagnosis(diagnosisID);
    const tranx = await knex.transaction();
    const editedDiagnosis = req.body;
    console.log(editedDiagnosis);
    let travelAdvDataMatch = {};
    const diagnosisDataMatch = {
      doctor_note: req?.body?.doc_note ?
        editedDiagnosis.doc_note :
        ExistingDiagnosisData.doctor_note,

      treatment_plan: req?.body?.treat_plan ?
        editedDiagnosis.treat_plan :
        ExistingDiagnosisData.treatment_plan,

      other_examinations: req?.body?.other_exm ?
        editedDiagnosis.other_exm :
        ExistingDiagnosisData.other_examinations,

    };
    if (editDocDiagnosis.travel_advData !== null) {
      travelAdvDataMatch = {
        travel_recommendation: editedDiagnosis.trav_reccom,
        travel_requirement: editedDiagnosis.trav_req,
        travelling_company_required: editedDiagnosis.trav_comp_req,
      };
    }

    const ptAllergiesDataMatch = {};
    if (editedDiagnosis.travel_advData  && !editedDiagnosis.patient_Allergies) {
      // console.log("Travel present & allergies not present");
      await editDocDiagnosis(tranx, diagnosisID, diagnosisDataMatch);
      await editTravelAdvData(tranx, travAdvID, travelAdvDataMatch);

      (await tranx).commit();
      return res.status(200).json({ message: "Diagnosis & Travel advisory saved!" });
    } else if (
      !editedDiagnosis.travel_advData  &&
      editedDiagnosis.patient_Allergies 
    ) {
      // console.log("Travel empty & allergies present");
      let allergiesDataMatch = {};
      await editDocDiagnosis(tranx, diagnosisID, diagnosisDataMatch);
      for (const allergy of editedDiagnosis.patient_Allergies) {
        allergiesDataMatch = {
          patient_ID: editedDiagnosis.pt_id,
          allergy_ID: allergy,
        };
        await insertPatientAllergies(tranx, allergiesDataMatch);
      }
      (await tranx).commit();
      return res.status(200).json({ message: "Diagnosis & Patient allergies edited!" });
    } else if (

      editedDiagnosis.travel_advData  &&
      editedDiagnosis.patient_Allergies
    ) {
      // console.log("Both present case hit!");
      let allergiesDataMatch = {};
      await editDocDiagnosis(tranx, diagnosisID, diagnosisDataMatch);
      await editTravelAdvData(tranx, travAdvID, travelAdvDataMatch);
      for (const allergy of editedDiagnosis.patient_Allergies) {
        allergiesDataMatch = {
          patient_ID: editedDiagnosis.pt_id,
          allergy_ID: allergy,
        };
        await insertPatientAllergies(tranx, allergiesDataMatch);
      }

      (await tranx).commit();
      return res
        .status(200)
        .json({ message: "Diagnosis, Travel advisory & Patient allergies edited!" });
    } else if (
      !editedDiagnosis.travel_advData  &&
      !editedDiagnosis.patient_Allergies
    ) {
      // console.log("Both null case hit!");
      await editDocDiagnosis(knex, diagnosisID, diagnosisDataMatch);
      return res.status(200).json({ message: "Diagnosis edited!" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message, stackTrace: error.stack });
  }
};

const showPatientDiagnosis = async (req, res) => {
  try {
    const diagnosisID = req.params.diagnosis_id;
    console.log(diagnosisID);
    const ptDiagnosisShown = await fetchptDiagnosis(diagnosisID);
    return res.status(200).json(ptDiagnosisShown);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  savePatientDiagnosis,
  editPatientDiagnosis,
  showPatientDiagnosis,
};
