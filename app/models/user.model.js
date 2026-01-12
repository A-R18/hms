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
  return knex("users").join("roles", "users.role_ID", "roles.id").select("users.id as user_Id", "roles.role", "users.user_name", "users.user_email", "users.user_password",);
};

const fetchExistingUser = (userID) => {
  return knex("users").select("*").where({ id: userID }).first();
};

const updateOldUser = (userID, updatedData) => {
  return knex("users").where({ id: userID }).update(updatedData);
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

module.exports = {
  saveUser,
  fetchAllusers,
  fetchExistingUser,
  updateOldUser,
  deleteCurrentUser,
  showCurrentUser,
  checkAccess,
  fetchUserRole
};
