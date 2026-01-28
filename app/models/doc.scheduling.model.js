const knex = require("knex")(require("../config/dbMod.js"));

const fetchDays = () => {
    return knex("days").select("*");
};


const insertDoctorSchedule = (db, scheduleRow) => {
    return db("doctors_scheduling").insert(scheduleRow);
};

const insertDocDays = (db, docDaySch) => {
    return db("doctors_day_schedule").insert(docDaySch);
};


const fetchDoctorSchedule = (doctorID, dayID) => {
    return knex("doctors_scheduling")
        .where({ doctor_ID: doctorID })
        .andWhere({ doctor_day_ID: dayID }).first();
};




const fetchDoctorAllSchedules = (doctorID) => {
    return knex("doctors_scheduling")
        .join("doctors_day_schedule", "doctors_scheduling.id", "doctors_day_schedule.schedule_ID")
        .join("days", "doctors_day_schedule.doc_sch_day_ID", "days.id")
        .where("doctors_scheduling.doctor_ID", doctorID)
        .groupBy("doctors_scheduling.id")
        .select("doctors_scheduling.*", knex.raw("GROUP_CONCAT(days.day) as days"));
};



const fetchExistingDocSchedule = (schID) => {
    return knex("doctors_scheduling")
        .join("doctors_day_schedule", "doctors_scheduling.id", "doctors_day_schedule.schedule_ID")
        .where("doctors_scheduling.id", schID)
        .select("doctors_scheduling.*").first()
        .select("doctors_day_schedule.*");
};



const fetchExistingDocDays = (schID) => {
    return knex("doctors_day_schedule")
        .where({ schedule_ID: schID })
        .select("doctors_day_schedule.*");
};



const editDoctorSchedule = (db, schID, updatedRecord) => {
    return db("doctors_scheduling").where({ id: schID }).update(updatedRecord);
};

const editDocSchDays = (db, editedDaySch) => {
    return db("doctors_day_schedule").insert(editedDaySch);
};


const removeDoctorSchedule = (schID) => {
    return knex("doctors_scheduling").where({ id: schID }).delete();
};

const deleteSchDays = (db, schID) => {
    return db("doctors_day_schedule")
        .where({ schedule_ID: schID }).delete();
}

module.exports = {
    fetchDays,
    insertDoctorSchedule,
    fetchDoctorSchedule,
    editDoctorSchedule,
    fetchExistingDocSchedule,
    removeDoctorSchedule,
    fetchDoctorAllSchedules,
    insertDocDays,
    fetchExistingDocDays,
    deleteSchDays,
    editDocSchDays
};