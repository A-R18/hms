const { count, countDoctors } = require("../utils/recordCount.util.js");

const knex = require("knex")(require("../config/dbMod.js"));

const saveUser = (userData) => {
  return knex("users").insert(userData);
};

const fetchUserRole = (userRoleID) => {
  return knex("roles").where({ id: userRoleID }).select("roles.role").first();
};

const fetchAllusers = (givenLimit, givenOffset, role) => {
  return knex("users")
    .join("roles", "users.role_ID", "roles.id")
    .where("roles.role", role)
    .select(
      "users.id as user_Id",
      "users.user_name",
      "users.user_email",
      "roles.role",
      "users.user_password"
    )

    .limit(givenLimit)
    .offset(givenOffset);
};

const fetchDoctors = (role, givenLimit, givenOffset) => {
  return knex("users")
    .leftJoin("doctors", "users.id", "doctors.user_ID")
    .leftJoin("roles", "users.role_ID", "roles.id")
    .leftJoin("doctor_specialities", "doctors.spec_ID", "doctor_specialities.id")
    .where("roles.role", role)
    .select(
      "users.id as user_Id",
      "users.user_name",
      "users.user_email",
      "users.user_password",
      "roles.role",
      "doctors.id",
      "doctors.contact",
      "doctors.spec_ID",
      "doctor_specialities.speciality"
    )
    .limit(givenLimit)
    .offset(givenOffset);
};

const fetchExistingUser = (userID) => {
  return knex("users").select("*").where({ id: userID }).first();
};

const updateOldUser = (db, userID, updatedData) => {
  return db("users").where({ id: userID }).update(updatedData);
};

const deleteCurrentUser = (userID) => {
  return knex("users").where({ id: userID }).delete();
};

const showCurrentUser = (userID) => {
  return knex("users").select("*").where({ id: userID }).first();
};

const checkAccess = async (privilege, allowedModule, userRoleID) => {
  const permissionMatch = await knex("permissions")
    .where({ role_ID: userRoleID })
    .join("privileges", "permissions.privilege_ID", "privileges.id")
    .join("modules", "permissions.module_ID", "modules.id")
    .where("privileges.privilege", privilege)
    .where("modules.module", allowedModule)
    .select("privileges.privilege", "modules.module")
    .first();
  if (!!permissionMatch) {
    return true;
  }
  return false;
};

const updateOldDoc = (db, userID, existingData) => {
  return db("users").where({ id: userID }).update(existingData);
};

const regSpecDoc = (db, specData) => {
  return db("doctors").insert(specData);
};

const updateSpecDoc = (db, userID, specData) => {
  return db("doctors").where({ user_ID: userID }).update(specData);
};

const fetchExistingDoctor = (db, userID) => {
  return db("doctors")
    .join("users", "doctors.user_ID", "users.id")
    .where("doctors.user_ID", userID)
    .select("users.id", "users.user_name", "users.user_email", "doctors.*")
    .first();
};

const fetchDcotorSpecialities = () => {
  return knex("doctor_specialities").select("*");
};

const totalUsers = count("users", "user");
const totalDoctors = count("users", "doctor");
const totalPatients = count("patients");

module.exports = {
  saveUser,
  fetchAllusers,
  fetchExistingUser,
  updateOldUser,
  deleteCurrentUser,
  showCurrentUser,
  checkAccess,
  fetchUserRole,
  updateOldDoc,
  updateSpecDoc,
  fetchExistingDoctor,
  fetchDoctors,
  fetchDcotorSpecialities,
  regSpecDoc,
  totalUsers,
  totalDoctors,
  totalPatients,
};
