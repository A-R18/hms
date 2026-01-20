const knex = require("knex")(require("../config/dbMod.js"));

const authenticateUser = async (userEmail) => {
  const result = await knex("users")
    .where({ user_email: userEmail })
      .select("users.id", "users.role_ID", "users.user_email", "users.user_password")
    .first();

  return result;
};

const fetchUserRole = (userRoleID)=>{
return knex("roles").select("roles.role").where({id:userRoleID}).first();
}

const fetchUserPermissions = (userRoleID) => {
    return knex("permissions").where({ role_ID: userRoleID })
    .join("modules", "permissions.module_id", "modules.id")
    .join("privileges", "permissions.privilege_id", "privileges.id")
    .select("modules.module", "privileges.privilege");
}

module.exports = { authenticateUser, fetchUserRole, fetchUserPermissions };
