const knex = require("knex")(require("../config/dbMod.js"));

const count = (tableName, role = null) => {
    if (role === null) { return knex(tableName).count("* as count"); }
    else {
        return knex(tableName).join("roles", `${tableName}.role_ID`, "roles.id")
            .where({ role: role })
            .count("* as count");
    }
}


module.exports = { count };