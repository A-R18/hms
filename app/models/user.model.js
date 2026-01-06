const knex = require("knex")(require("../config/dbMod.js"));
const saveUser = (userData) => {
    return knex("users").insert(userData);
}

module.exports = {
    saveUser
}