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


const fetchDoctorSchedule = (doctorID, aptDate) => {
    return knex("doctors_scheduling")
        .where({ doctor_ID: doctorID })
        .andWhere("doctors_scheduling.doc_from_date", "<=", aptDate)
        .andWhere("doctors_scheduling.doc_to_date", ">=", aptDate)
        .first();
};




const fetchDoctorAllSchedules = (doctorID) => {
    return knex("doctors_scheduling")
    .join("days", "doctors_scheduling.doctor_day_ID", "days.id")
        .where("doctor_ID", doctorID)
        .select("doctors_scheduling.*", "days.day");
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


const checkDayInScheduling = (schID) => {
    return knex("doctors_day_schedule")
        .where({ schedule_ID: schID })
        .pluck("doc_sch_day_ID");
    //work halted due to an occurring problem in logic
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
    editDocSchDays,
    checkDayInScheduling
};