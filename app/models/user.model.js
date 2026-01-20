const knex = require("knex")(require("../config/dbMod.js"));

const saveUser = (userData) => {
  return knex("users").insert(userData);
};

const fetchUserRole = (userRoleID) => {
  return knex("roles")
    .where({ id: userRoleID })
    .select("roles.role")
    .first();
}

const fetchAllusers = () => {
  return knex("users").join("roles", "users.role_ID", "roles.id").select("users.id as user_Id", "roles.role", "users.user_name", "users.user_email", "users.user_password");
};

const fetchDoctors = () => {
  return knex("users")
    .leftJoin("roles", "users.role_ID", "roles.id")
    .leftJoin("doctors", "users.id", "doctors.user_ID")
    .leftJoin("doctor_specialities", "doctors.spec_ID", "doctor_specialities.id")
    .select("users.id as user_Id", "users.user_name", "users.user_email", "users.user_password", "roles.role", "doctors.contact", "doctors.spec_ID");
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
  console.log(privilege, allowedModule, userRoleID);
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
  return db("doctors").where({ user_ID: userID }).first();
};

const fetchDcotorSpecialities = () => {
  return knex("doctor_specialities").select("*");
};

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
  regSpecDoc
};
