const knex = require("knex")(require("../config/dbMod.js"));

const fetchTodaysAppointments = (doc_id, aptDate) => {
    return knex("appointments")
        .where("doctor_ID", doc_id)
        .andWhere("appointment_date", aptDate)
        .select("appointment_time");
}


const insertAppointment = (appointmentData) => {
    return knex("appointments").insert(appointmentData);
}

module.exports = { insertAppointment, fetchTodaysAppointments };