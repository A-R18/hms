const knex = require("knex")(require("../config/dbMod.js"));

const fetchDays = () => {
    return knex("days").select("*");
};


const insertDoctorSchedule = (scheduleRow) => {
    return knex("doctors_scheduling").insert(scheduleRow);
};


const fetchDoctorSchedule = (doctorID) => {
    return knex("doctors_scheduling").where({ doctor_ID: doctorID }).select("*");
};


const fetchExistingDocSchedule = (schID) => {
    return knex("doctors_scheduling").where({ id: schID }).first();
};


const editDoctorSchedule = (schID, updatedRecord) => {
    return knex("doctors_scheduling").where({ id: schID }).update(updatedRecord);
};


const removeDoctorSchedule = (schID) => {
    return knex("doctors_scheduling").where({ id: schID }).delete();
};

module.exports = {
    fetchDays,
    insertDoctorSchedule,
    fetchDoctorSchedule,
    editDoctorSchedule,
    fetchExistingDocSchedule,
    removeDoctorSchedule
};