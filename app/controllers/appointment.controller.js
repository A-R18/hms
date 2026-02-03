const dayjs = require("dayjs");
const customParseFormat = require("../../node_modules/dayjs/plugin/customParseFormat.js");
const duration = require("../../node_modules/dayjs/plugin/duration.js");
dayjs.extend(customParseFormat);
dayjs.extend(duration);
const { fetchDoctorSchedule, checkDayInScheduling } = require("../models/doc.scheduling.model");
const { generateAllSlots, generateFilteredSlots } = require("../services/appointment.services");
const {
  fetchTodaysAppointments,
  insertAppointment,
  fetchAllAppointments,
  removeAppointment,
  fetchExistingAppointmentData,
  rescheduleAppointment,
  count7DaysAppointments,
} = require("../models/appointment.model.js");

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
    // return res.json(docScheduleExists);

    if (docScheduleExists) {
      //fetches all slots from db
      const alreadyBooked = await fetchTodaysAppointments(docID, appointmentDate); //for retreiving that day only

      let alreadyBookedSlots = [];
      alreadyBooked.map((slot) => alreadyBookedSlots.push(slot.appointment_time));

      const start_T = docScheduleExists.doctor_from_time;
      const end_T = docScheduleExists.doctor_to_time;
      const slotDur = docScheduleExists.doc_slot_dur;
      const scheduleID = docScheduleExists.id;

      const rawGeneratedSlots =
        alreadyBookedSlots.length !== 0
          ? generateFilteredSlots(alreadyBookedSlots, start_T, end_T, slotDur)
          : generateAllSlots(start_T, end_T, slotDur);
      let formattedSlots = [];

      rawGeneratedSlots.forEach((slot) => {
        formattedSlots.push(dayjs(slot, "HH:mm:ss").format("hh:mm A"));
      });
      return res
        .status(200)
        .json({ schedule_id: scheduleID, appointment_date: appointmentDate, formattedSlots });
    } else {
      return res.status(404).json({ alert: "Doctor schedule isn't available for this day!" });
    }
  } catch (error) {
    return res.status(200).json({ error: error.message, stackTrace: error.stack });
  }
};

const saveAppointment = async (req, res) => {
  try {
    const comingAptData = req.body;
    const dataMatch = {
      patient_ID: comingAptData.patient_id,
      doctor_ID: comingAptData.doc_id,
      schedule_ID: comingAptData.doc_sch_id,
      appointment_date: comingAptData.doc_apt_date,
      appointment_time: comingAptData.apt_time,
      appointment_status: comingAptData.apt_status,
    };

    const appointmentSaved = await insertAppointment(dataMatch);
    if (appointmentSaved) return res.status(200).json({ success: "slot reserved successfully" });
    return res.status(400).json({ alert: "DB error, didn't save appointment" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointmentID = req.body.apt_Id;
    const appointmentDeleted = await removeAppointment(appointmentID);
    if (appointmentDeleted) {
      return res.status(200).json({ alert: "appointment deleted successfully!" });
    } else {
      return res.status(404).json({ error: "DB error, didn't delete" });
    }
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const changeAppointment = async (req, res) => {
  try {
    const appointment_ID = req.body.apt_Id;
    const editedAppointmentDate = req.body.ed_apt_Date;
    const editedAppointmentTime = req.body.ed_apt_Time;
    const { aptDate, aptTime, aptStatus } = await fetchExistingAppointmentData(appointment_ID);
    if (aptStatus === "pending") {
      const editedAptData = {
        appointment_date: editedAppointmentDate,
        appointment_time: editedAppointmentTime,
      };
      const appointmentRescheduled = await rescheduleAppointment(appointment_ID, editedAptData);
      if (appointmentRescheduled) {
        return res.status(200).json({ success: "Appointment rescheduled successfully!" });
      } else {
        return res.status(400).json({ error: "DB error, didn't update" });
      }
    } else {
      return res.status(401).json({ alert: "Only pending appointments can be rescheduled!" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const showAppointment = async (req, res) => {
  try {
    const today = dayjs().startOf("day").format("YYYY-MM-DD");
    const weekFromToday = dayjs().add(7, "day").endOf("day").format("YYYY-MM-DD");
    const [{ count }] = await count7DaysAppointments(today, weekFromToday);

    let page;
    const limit = 4;
    const firstPage = 1;
    const lastPage = Math.ceil(count / limit);

    if (req.query.firstPage) {
      page = firstPage;
    } else if (req.query.lastPage) {
      page = lastPage;
    } else if (!req.query.page) {
      page = 1;
    } else if (req.query.page < firstPage || req.query.page > lastPage) {
      return res.json("invalid page entered");
    } else if (req.query.page) {
      page = req.query.page;
    }

    const offset = (page - 1) * limit;
    const rawAppointmentsfetched = await fetchAllAppointments(today, weekFromToday, limit, offset);
    let formattedAppointments = [];
    if (rawAppointmentsfetched) {
      rawAppointmentsfetched.forEach((appointment) => {
        const dataMatch = {
          id: appointment.id,
          patient_ID: appointment.patient_ID,
          doctor_ID: appointment.doctor_ID,
          appointment_date: dayjs(appointment.appointment_date)
          .format("ddd DD MMM YYYY"),
          appointment_time: dayjs(appointment.appointment_time, "HH:mm:ss").format("hh:mm:ss A"),
          appointment_status: appointment.appointment_status,
        };
        formattedAppointments.push(dataMatch);
      });
      return res
        .status(200)
        .json({ totalAppointments: count, currentPage: page, formattedAppointments });
    } else {
      return res.status(404).json({ alert: "DB error, couldn't fetch!" });
    }
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

module.exports = {
  createAppointment,
  deleteAppointment,
  showAppointment,
  changeAppointment,
  saveAppointment,
};
