const knex = require("knex")(require("../config/dbMod.js"));

const fetchDays = () => {
    return knex("days").select("*");
}

module.exports = { fetchDays };