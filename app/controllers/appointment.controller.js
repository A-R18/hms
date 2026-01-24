const dayjs = require("dayjs");
const customParseFormat = require("../../node_modules/dayjs/plugin/customParseFormat.js");
const duration = require("../../node_modules/dayjs/plugin/duration.js");
dayjs.extend(customParseFormat);
dayjs.extend(duration);
const { fetchDoctorSchedule } = require("../models/doc.scheduling.model");
const { generateAppointments } = require("../services/appointment.services");


const showAppointments = async (req, res) => {
    try {
        const docID = req.params.id;
        const appointmentDate = req.body.doc_apt_date;
        const dayID = dayjs().day(appointmentDate).format("dddd");
        const docScheduleFetched = await fetchDoctorSchedule(docID, dayID);

        // console.log(docScheduleFetched);

        if (docScheduleFetched) {
            const slotsArray = []
            const docFromTime = dayjs().format(schedule.doctor_from_time);
            const docToTime = dayjs().format(schedule.doctor_to_time);
            const docSlotDuration = dayjs().format(schedule.doc_slot_dur);
            

            slotsArray.push(docFromTime + " " + docToTime);
            // generateAppointments(docID, docFromTime, docToTime);

            console.log(slotsArray);

        } else {
            return res.status(400).json({ alert: "DB error!, didn't fetch!" });
        }
    } catch (error) {
        
        return res.status(200).json({ error: error });

    }

}
module.exports = { showAppointments }