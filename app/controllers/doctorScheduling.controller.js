const knex = require("knex")(require("../config/dbMod.js"));
const dayjs = require("dayjs");
const { fetchDays,
    insertDoctorSchedule,
    editDoctorSchedule,
    removeDoctorSchedule,
    fetchExistingDocSchedule,
    fetchDoctorAllSchedules,
   } = require("../models/doc.scheduling.model.js");

const showDays = async (req, res) => {
    try {
        const daysFetched = await fetchDays();
        if (daysFetched) {
            res.status(200).json(daysFetched);
        } else {
            res.status(400).json({ dbError: "not found!" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const saveDoctorSchedule = async (req, res) => {
    const tranx = await knex.transaction();
    const shcheduleData = req.body;
    let recordsSaved = [];

    try {

        for (const schedule of shcheduleData) {

            const today = dayjs().startOf("day");
            const toDate = dayjs(schedule.to_date);
            const fromDate = dayjs(schedule.from_date);
            const toTime = dayjs(schedule.to_time, "HH:mm");
            const fromTime = dayjs(schedule.from_time, "HH:mm");
            if (toDate.isBefore(today) || fromDate.isBefore(today)) {
                return res.status(401).json({ alert: "you can't enter past dates" });
            }

            if (!toTime.isAfter(fromTime)) {
                return res.status(401).json({ alert: "end time can't be before start time" });
            }

            const schDataMatch = {

                doctor_ID: schedule.docID,
                doctor_day_ID: schedule.doc_day,
                doctor_from_time: schedule.from_time,
                doctor_to_time: schedule.to_time,
                doc_from_date: schedule.from_date,
                doc_to_date: schedule.to_date,
                doc_slot_dur: schedule.slot_duration,
            };

            scheduleSaved = await insertDoctorSchedule(tranx, schDataMatch);

            recordsSaved.push(scheduleSaved);
            console.log(recordsSaved);
        };

        (await tranx.commit());
        if (scheduleSaved && shcheduleData.length === recordsSaved.length) {

            return res.status(200).json("Schedule submitted successfully");
        } else {

            return res.status(400).json({ error: "DB error, didn't save" });
        }

    } catch (error) {
        (await tranx).rollback();
        if(error.code === "ER_DUP_ENTRY"){
             return res.status(401).json({ alert: "You can't register  same doctor's schdeule for same dates again!" });
        }else
        return res.status(400).json({ code: error.code, error: error.message });

    }
};


const showDoctorSchedule = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const docSchedule = await fetchDoctorAllSchedules(doctorId);
        const formattedSchedule = [];
        docSchedule.forEach(schedule => {
            const scheduleformat = {
                
                schedule_id: schedule.id,
                doc_ID: schedule.doctor_ID,
                doc_day: schedule.day,
                doc_from_time: dayjs(schedule.doctor_from_time, "HH:mm:ss").format("hh:mm A"),
                doc_to_time: dayjs(schedule.doctor_to_time, "HH:mm:ss").format("hh:mm A"),
                doc_from_date: dayjs(schedule.doc_from_date).format("ddd DD MMM YYYY"),
                doc_to_date: dayjs(schedule.doc_to_date).format("ddd DD MMM YYYY"),
                doc_slot_dur: schedule.doc_slot_dur + " minutes"
            }
            formattedSchedule.push(scheduleformat);
        });
        if (docSchedule) {
            res.status(200).json(formattedSchedule);
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
        let schCounter = [];
        let scheduleUpdated;
        for (const schedule of editedDocSchedule) {
            const scheduleID = schedule.sch_ID;
            const ExistingDocSchedule = await fetchExistingDocSchedule(scheduleID);
             const updatedSchMatch = {

            doctor_from_time:
                schedule ?
                    schedule.from_time :
                    ExistingDocSchedule.doctor_from_time,

            doctor_to_time:
                schedule ?
                    schedule.to_time :
                    ExistingDocSchedule.doctor_to_time,

            doc_slot_dur:
                schedule ?
                    schedule.slot_duration :
                    ExistingDocSchedule.doc_slot_dur,
        };
         scheduleUpdated = await editDoctorSchedule(tranx, scheduleID, updatedSchMatch);
        schCounter.push(scheduleUpdated);
        }
        // return res.json(ExistingDocSchedule);
       
        (await tranx).commit();

        if (scheduleUpdated && editedDocSchedule.length === schCounter.length) {
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