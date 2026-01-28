const knex = require("knex")(require("../config/dbMod.js"));

const { fetchDays,
    insertDoctorSchedule,
    fetchDoctorSchedule,
    editDoctorSchedule,
    removeDoctorSchedule,
    fetchExistingDocSchedule,
    fetchDoctorAllSchedules,
    insertDocDays,
    fetchExistingDocDays,
    deleteSchDays, 
    editDocSchDays} = require("../models/doc.scheduling.model.js");

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
    const tranx = await knex.transaction();
    try {
        console.log("case hit!");
        const shcheduleData = req.body;
        console.log(shcheduleData);
        const schDataMatch = {
            doctor_ID: shcheduleData.docID,
            doctor_from_time: shcheduleData.from_time,
            doctor_to_time: shcheduleData.to_time,
            doc_slot_dur: shcheduleData.slot_duration,
            doc_from_date: shcheduleData.from_date,
            doc_to_date: shcheduleData.to_date
        };
        const scheduleSaved = await insertDoctorSchedule(tranx, schDataMatch);

        let daysSaved = [] //array declared to counter check the insertions

        for (const day of req.body.doc_days) {
            const schDayDataMatch = {
                schedule_ID: scheduleSaved[0], //to be figured how it comes
                doc_sch_day_ID: day
            }

            const dayInserted = await insertDocDays(tranx, schDayDataMatch);
            daysSaved.push(dayInserted);

        }
        // console.log(dayInserted);
        (await tranx).commit();

        if (scheduleSaved && req.body.doc_days.length === daysSaved.length) {

            return res.status(200).json("Schedule submitted successfully");
        } else {

            return res.status(400).json({ error: "DB error, didn't save" });
        }

    } catch (error) {
        (await tranx).rollback();
        res.status(400).json({ error: error.message });

    }
};

const showDoctorSchedule = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const docSchedule = await fetchDoctorAllSchedules(doctorId);
        if (docSchedule) {
            res.status(200).json(docSchedule);
        } else {
            res.status(400).json({ message: "DB error! nothing found" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

};

const changeDoctorSchedule = async (req, res) => {
    const tranx = await knex.transaction();
    try {
        const editedDocSchedule = req.body;
        const scheduleID = editedDocSchedule.sch_ID;
        const ExistingDocSchedule = await fetchExistingDocSchedule(scheduleID);
        const ExistingDocDays = await fetchExistingDocDays(ExistingDocSchedule.schedule_ID);
        // return res.json({ExistingDocSchedule, ExistingDocDays}); 
        const updatedSchMatch = {

            doctor_from_time:
                req?.body?.from_time ?
                    editedDocSchedule.from_time :
                    ExistingDocSchedule.doctor_from_time,

            doctor_to_time:
                req?.body?.to_time ?
                    editedDocSchedule.to_time :
                    ExistingDocSchedule.doctor_to_time,

            doc_from_date:
                req?.body?.from_date ?
                    editedDocSchedule.from_date :
                    ExistingDocSchedule.doc_from_date,

            doc_to_date:
                req?.body?.to_date ?
                    editedDocSchedule.to_date :
                    ExistingDocSchedule.doc_to_date,

            doc_slot_dur:
                req?.body?.slot_duration ?
                    editedDocSchedule.slot_duration :
                    ExistingDocSchedule.doc_slot_dur,
        };
        const deletedScheduleDays = await deleteSchDays(tranx, scheduleID);
        const scheduleUpdated = await editDoctorSchedule(tranx, scheduleID, updatedSchMatch);
        let updatedSchDayMatch = {};
        let daysCheck = [];
        for (const day of editedDocSchedule.doc_days) {
            updatedSchDayMatch = {
                schedule_ID: scheduleID, //to be decided
                doc_sch_day_ID: day
            }
            daysCheck.push(day);
            await editDocSchDays(tranx, updatedSchDayMatch);
        }
        (await tranx).commit();



        if (deletedScheduleDays && scheduleUpdated && editedDocSchedule.doc_days.length === daysCheck.length) {
            res.status(200).json({ message: "schedule updated successfully!" });
        } else {
            res.status(400).json({ message: "DB error, didn't update" });
        }
    } catch (error) {
        (await tranx).rollback();
        return res.status(400).json({ error: error.message, trace: error.stack });
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
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    showDays,
    saveDoctorSchedule,
    showDoctorSchedule,
    changeDoctorSchedule,
    deleteDoctorSchedule,
};