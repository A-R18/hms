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

const fetchDoctorSchedule = (doctorID, aptDate, dayID) => {
  return knex("doctors_scheduling")
    .where({ doctor_ID: doctorID })
    .andWhere("doctors_scheduling.doc_from_date", "<=", aptDate)
    .andWhere("doctors_scheduling.doc_to_date", ">=", aptDate)
    .andWhere({ doctor_day_ID: dayID })
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
    .where("doctors_scheduling.id", schID)
    .select("doctors_scheduling.*")
    .first();
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
  editDocSchDays,
};
