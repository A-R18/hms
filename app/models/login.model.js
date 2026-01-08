const knex = require("knex")(require("../config/dbMod.js"));

const authenticateUser = async (userEmail) => {
  const result = await knex("users")
    .where({ user_email: userEmail })
    .select("users.id", "users.role_ID", "users.user_email", "users.user_password")
    .first();

  return result;
};
module.exports = { authenticateUser };
