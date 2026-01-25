const knex = require("knex")(require("../config/dbMod.js"));

const { fetchDays,
    insertDoctorSchedule,
    fetchDoctorSchedule,
    editDoctorSchedule,
    removeDoctorSchedule,
    fetchExistingDocSchedule, 
    fetchDoctorAllSchedules} = require("../models/doc.scheduling.model.js");

const showDays = async (req, res) => {
    try {
        const daysFetched = await fetchDays();
        if (daysFetched) {
            res.status(200).json(daysFetched);
        } else {
            res.status(400).json({ dbError: "not found!" });
        }
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

const saveDoctorSchedule = async (req, res) => {
    try {

        const shcheduleData = req.body;
        console.log(shcheduleData);
        const schDataMatch = {
            doctor_ID: shcheduleData.docID,
            doctor_day_ID: shcheduleData.dayID,
            doctor_from_time: shcheduleData.from_time,
            doctor_to_time: shcheduleData.to_time,
            doc_slot_dur: shcheduleData.slot_duration,
        };
        const scheduleSaved = await insertDoctorSchedule(schDataMatch);
        if (scheduleSaved) {
            return res.status(200).json({ message: "schedule saved successfully!" });
        } else {
            return res.status(400).json({ message: "DB error! didn't save" });
        }
    } catch (error) {
        // console.log(error.code);
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ error: "can't add a day schedule twice" });
        } else
            return res.status(400).json({ error: error });

    }
};

const showDoctorSchedule = async (req, res) => {
    try {
        const doctorId = req.params.id;
        // console.log("doctorID is ", doctorId);
       
        const docSchedule = await fetchDoctorAllSchedules(doctorId);
        console.log(docSchedule);
        if (docSchedule) {
            res.status(200).json(docSchedule);
        } else {
            res.status(400).json({ message: "DB error! nothing found" });
        }
    } catch (error) {
        return res.status(400).json({ error: error });
    }

};

const changeDoctorSchedule = async (req, res) => {
    try {
        const scheduleID = req.params.id;
        const ExistingDocSchedule = await fetchExistingDocSchedule(scheduleID);
        // return res.json(ExistingDocSchedule);
        const editedDocSchedule = req.body;
        const updatedSchMatch = {

            doctor_day_ID:
                req?.body?.docID ?
                    editedDocSchedule.dayID :
                    ExistingDocSchedule.doctor_day_ID,

            doctor_from_time:
                req?.body?.docID ?
                    editedDocSchedule.from_time :
                    ExistingDocSchedule.doctor_from_time,

            doctor_to_time:
                req?.body?.docID ?
                    editedDocSchedule.to_time :
                    ExistingDocSchedule.doctor_to_time,

            doc_slot_dur:
                req?.body?.docID ?
                    editedDocSchedule.doc_slot_dur :
                    ExistingDocSchedule.doc_slot_dur,
        };
        const scheduleUpdated = await editDoctorSchedule(scheduleID, updatedSchMatch);
        if (scheduleUpdated) {
            res.status(200).json({ message: "schedule updated successfully!" });
        } else {
            res.status(400).json({ message: "DB error, didn't update" });
        }
    } catch (error) {
        console.log(error.code);
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ error: "can't add a day schedule twice" });
        } else
            return res.status(400).json({ error: error });
    }
};

const deleteDoctorSchedule = async (req, res) => {
    try {
        const scheduleID = req.params.id;
        const scheduleDeleted = await removeDoctorSchedule(scheduleID);
        if (scheduleDeleted) {
            res.status(200).json({ message: "schedule deleted successfully!" });
        } else {
            res.status(400).json({ message: "DB error, didn't delete" });
        }
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

module.exports = {
    showDays,
    saveDoctorSchedule,
    showDoctorSchedule,
    changeDoctorSchedule,
    deleteDoctorSchedule,
};