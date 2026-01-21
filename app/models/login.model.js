const knex = require("knex")(require("../config/dbMod.js"));

const authenticateUser = async (userEmail) => {
  const result = await knex("users")
    .where({ user_email: userEmail })
    .select("users.id", "users.user_name", "users.role_ID", "users.user_email", "users.user_password")
    .first();

  return result;
};

const fetchUserRole = (userRoleID) => {
  return knex("roles").select("roles.role").where({ id: userRoleID }).first();
}

const fetchUserPermissions = (userRoleID) => {
  return knex("permissions").where({ role_ID: userRoleID })
    .join("modules", "permissions.module_id", "modules.id")
    .join("privileges", "permissions.privilege_id", "privileges.id")
    .select("modules.module", "privileges.privilege");
}

const FetchDocEssentials = (docUID) => {
  return knex("doctors").join("doctor_specialities", "doctors.spec_ID", "doctor_specialities.id").select("doctor_specialities.speciality").first();
}



module.exports = { authenticateUser, fetchUserRole, fetchUserPermissions, FetchDocEssentials };
