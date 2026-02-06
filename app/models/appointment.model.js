const knex = require("knex")(require("../config/dbMod.js"));

const fetchTodaysAppointments = (doc_id, aptDate) => {
  return knex("appointments")
    .where("doctor_ID", doc_id)
    .andWhere("appointment_date", aptDate)
    .select("appointment_time");
};


const fetchAllAppointments = (today, seventhDay, givenLimit, givenOffset) => {
  return knex("appointments")
    .where("appointments.appointment_date", ">=", today)
    .andWhere("appointments.appointment_date", "<=", seventhDay)
    .orWhere("appointments.appointment_status", "pending")
    .orWhere("appointments.appointment_status", "confirmed")
    .limit(givenLimit)
    .offset(givenOffset);
};


const fetchAllDocSpecificAppointments = (docID, today, seventhDay, givenLimit, givenOffset) => {
  return knex("appointments")
    .join("patients", "appointments.patient_ID", "patients.id")
    .where({ doctor_ID: docID })
    .where("appointments.appointment_date", ">=", today)
    .andWhere("appointments.appointment_date", "<=", seventhDay)
    .andWhere("appointments.appointment_status", "confirmed")
    .select("appointments.appointment_date",
      "appointments.appointment_time",
      "appointments.appointment_status",
      "patients.patient_name",
      "patients.contact")
    .limit(givenLimit)
    .offset(givenOffset);
};


const insertAppointment = (appointmentData) => {
  return knex("appointments").insert(appointmentData);
};

const removeAppointment = (aptID) => {
  return knex("appointments").where({ id: aptID }).delete();
};

const fetchExistingAppointmentData = (aptID) => {
  return knex("appointments")
    .where({ id: aptID })
    .select(
      "appointments.appointment_time as aptTime",
      "appointments.appointment_date as aptDate",
      "appointments.appointment_status as aptStatus"
    )
    .first();
};

const rescheduleAppointment = (appointmntID, aptData) => {
  return knex("appointments").where({ id: appointmntID }).update(aptData);
};



const count7DaysAppointments = (today, seventhDay) => {
  return knex("appointments")
    .where("appointments.appointment_date", ">=", today)
    .andWhere("appointments.appointment_date", "<=", seventhDay)
    .orWhere("appointments.appointment_status", "pending")
    .orWhere("appointments.appointment_status", "confirmed")
    .count("* as count");
};


const count7DysApptsForSpecDoc = (docID, today, seventhDay) => {
  return knex("appointments")
    .where({ doctor_ID: docID })
    .where("appointments.appointment_date", ">=", today)
    .andWhere("appointments.appointment_date", "<=", seventhDay)
    .andWhere("appointments.appointment_status", "confirmed")
    .count("* as count");
};




module.exports = {
  insertAppointment,
  fetchTodaysAppointments,
  fetchAllAppointments,
  removeAppointment,
  rescheduleAppointment,
  fetchExistingAppointmentData,
  count7DaysAppointments,
  count7DysApptsForSpecDoc,
  fetchAllDocSpecificAppointments,
};
