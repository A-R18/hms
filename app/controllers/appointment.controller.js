const dayjs = require("dayjs");
const customParseFormat = require("../../node_modules/dayjs/plugin/customParseFormat.js");
const duration = require("../../node_modules/dayjs/plugin/duration.js");
dayjs.extend(customParseFormat);
dayjs.extend(duration);
const { fetchDoctorSchedule } = require("../models/doc.scheduling.model");
const { generateAllSlots, generateFilteredSlots } = require("../services/appointment.services");
const { fetchTodaysAppointments, insertAppointment } = require("../models/appointment.model.js");



const createAppointment = async (req, res) => {
    try {
        const docID = req.params.doc_id;
        const appointmentDate = req.body.doc_apt_date;
        const dayID = dayjs(appointmentDate).day();
        console.log("day id is: ", dayID);
        if (dayID === 0) res.status(401).json({ constraint: "you can't set appointment for sunday!" });
        const docScheduleExists = await fetchDoctorSchedule(docID, dayID);
        console.log(docScheduleExists);

        if (docScheduleExists) {
            console.log("case hit");
            const alreadyBooked = await fetchTodaysAppointments(docID, appointmentDate);
            let alreadyBookedSlots = [];
            alreadyBooked.map((slot) => alreadyBookedSlots.push(slot.appointment_time));
            console.log("slots become: ", alreadyBookedSlots);
            const start_T = docScheduleExists.doctor_from_time;
            const end_T = docScheduleExists.doctor_to_time;
            const slotDur = docScheduleExists.doc_slot_dur;

            const generatedSlots = alreadyBookedSlots.length !== 0
                ? generateFilteredSlots(alreadyBookedSlots, start_T, end_T, slotDur)
                : generateAllSlots(start_T, end_T, slotDur);

            return res.status(200).json(generatedSlots);


        } else {
            return res.status(400).json({ alert: "DB error!, didn't fetch!" });
        }
    } catch (error) {

        return res.status(200).json({ error: error });

    }

}

const saveAppointment = async (req, res) => {
    try {
        const comingAptData = req.body;
        const dataMatch = {
            patient_ID: comingAptData.patient_id,
            doctor_ID: comingAptData.doc_id,
            appointment_date: comingAptData.doc_apt_date,
            appointment_time: comingAptData.apt_time,
            appointment_status: comingAptData.apt_status
        }

        const appointmentSaved = await insertAppointment(dataMatch);
        if (appointmentSaved)
        return res.status(200).json({ success: "slot reserved successfully" });
        return res.status(400).json({ alert: "DB error, didn't save appointment" });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

const deleteAppointment = () => {

}


const changeAppointment = () => {

}


const showAppointment = () => {

}

module.exports = { createAppointment, deleteAppointment, showAppointment, changeAppointment, saveAppointment }