const dayjs = require("dayjs");
const customParseFormat = require("../../node_modules/dayjs/plugin/customParseFormat.js");
const duration = require("../../node_modules/dayjs/plugin/duration.js");
dayjs.extend(customParseFormat);
dayjs.extend(duration);
const { fetchDoctorSchedule, checkDayInScheduling } = require("../models/doc.scheduling.model");
const { generateAllSlots, generateFilteredSlots } = require("../services/appointment.services");
const { fetchTodaysAppointments, insertAppointment, fetchAllAppointments } = require("../models/appointment.model.js");



const createAppointment = async (req, res) => {
    try {
        const docID = req.body.doc_id;
        const appointmentDate = req.body.doc_apt_date;
        const currentDate = dayjs().startOf("day");

        if (dayjs(appointmentDate).startOf("day").isBefore(currentDate)) {
            return res.status(403).json({ alert: "you can't book for past date!" });
        }
        const dayID = dayjs(appointmentDate).day();
        //here the query based comparison will be made so that day is specified correctly! (where appointmentDate <= doc_to_date)
        const docScheduleExists = await fetchDoctorSchedule(docID, appointmentDate, dayID);
        const scheduleID = docScheduleExists.id;
        const existingDocDays = await checkDayInScheduling(scheduleID);
        // return res.json(existingDocDays);
        console.log("schedule id is: ", scheduleID);

        console.log("days we get ", existingDocDays);
        if (!existingDocDays.includes(dayID))
            return res.status(401).json({ constraint: "day is not available in doctor's schedule!" });
       

        //a schedule will be selected which will be valid 
        // (where appointmentDate <= doc_to_date)

        if (docScheduleExists) {
            //fetches all slots from db 
            const alreadyBooked = await fetchTodaysAppointments(docID, appointmentDate);//for retreiving that day only
            console.log("already booked array is: ", alreadyBooked);
            let alreadyBookedSlots = [];
            alreadyBooked.map((slot) => alreadyBookedSlots.push(slot.appointment_time));


            const start_T = docScheduleExists.doctor_from_time;
            const end_T = docScheduleExists.doctor_to_time;
            const slotDur = docScheduleExists.doc_slot_dur;

            const generatedSlots = alreadyBookedSlots.length !== 0
                ? generateFilteredSlots(alreadyBookedSlots, start_T, end_T, slotDur)
                : generateAllSlots(start_T, end_T, slotDur);

            return res.status(200).json(generatedSlots);


        } else {
            return res.status(404).json({ alert: "Doctor schedule not available for this day!" });
        }
    } catch (error) {

        return res.status(200).json({ error: error.message, stackTrace: error.stack });

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
        return res.status(400).json({ error: error.message });
    }
}

const deleteAppointment = () => {

}


const changeAppointment = () => {
    try {
        const incomingAppointmentData = req.body;
        const docID = req.params.doc_id;
        const patientID = req.params.patient_id;
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}




const showAppointment = async (req, res) => {
    try {
        const AllAppointmentsfetched = await fetchAllAppointments();
        if (AllAppointmentsfetched) {
            return res.status(200).json(AllAppointmentsfetched);
        } else {
            return res.status(404).json({ alert: "DB error, couldn't fetch!" });
        }
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
}

module.exports = { createAppointment, deleteAppointment, showAppointment, changeAppointment, saveAppointment }