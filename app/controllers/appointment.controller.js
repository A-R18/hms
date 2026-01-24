const dayjs = require("dayjs");
const customParseFormat = require("../../node_modules/dayjs/plugin/customParseFormat.js");
const duration = require("../../node_modules/dayjs/plugin/duration.js");
dayjs.extend(customParseFormat);
dayjs.extend(duration);
const { fetchDoctorSchedule } = require("../models/doc.scheduling.model");
const { generateFirstAppointment } = require("../services/appointment.services");


const createAppointment = async (req, res) => {
    try {
        const docID = req.params.doc_id;
        const appointmentDate = req.body.doc_apt_date;
        const dayID = dayjs(appointmentDate).day();
        const docScheduleFetched = await fetchDoctorSchedule(docID, dayID);


        if (docScheduleFetched) {
           
            const startTime = dayjs(docScheduleFetched.doctor_from_time, "HH:mm");
            const endTime = dayjs(docScheduleFetched.doctor_to_time, "HH:mm");
            const docSlotDuration = dayjs.duration(docScheduleFetched.doc_slot_dur, "minutes");
            let generatedSlots = []
            let i = startTime;
            while (i.isBefore(endTime)) {
                generatedSlots.push(i.format("HH:mm"));
                i = i.add(docSlotDuration);
            }
            return res.status(200).json(generatedSlots);


        } else {
            return res.status(400).json({ alert: "DB error!, didn't fetch!" });
        }
    } catch (error) {

        return res.status(200).json({ error: error });

    }

}

const deleteAppointment = () => {

}



const changeAppointment = () => {

}



const showAppointment = () => {

}




module.exports = { createAppointment, deleteAppointment, showAppointment, changeAppointment }