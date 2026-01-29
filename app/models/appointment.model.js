const knex = require("knex")(require("../config/dbMod.js"));

const fetchTodaysAppointments = (doc_id, aptDate) => {
    return knex("appointments")
        .where("doctor_ID", doc_id)
        .andWhere("appointment_date", aptDate)
        .select("appointment_time");
};

const fetchAllAppointments = () => {
    return knex("appointments").select("*");
};


const insertAppointment = (appointmentData) => {
    return knex("appointments").insert(appointmentData);
};

const removeAppointment = (aptID) => {
    return knex("appointments").where({ id: aptID }).delete();
};

const fetchExistingAppointmentData = (aptID) => {
    return knex("appointments").where({ id: aptID })
    .select("appointments.appointment_time as aptTime", "appointments.appointment_date as aptDate", "appointments.appointment_status as aptStatus" ).first();
}

const rescheduleAppointment = (appointmntID, aptData) => {
    return knex("appointments").where({ id: appointmntID })
        .update(aptData);
};

module.exports = {
    insertAppointment,
    fetchTodaysAppointments,
    fetchAllAppointments,
    removeAppointment,
    rescheduleAppointment,
    fetchExistingAppointmentData
};