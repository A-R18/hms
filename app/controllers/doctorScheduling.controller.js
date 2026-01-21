const knex = require("knex")(require("../config/dbMod.js"));

const { fetchDays } = require("../models/doc.scheduling.model.js");

const showDays = async (req, res) => {
    try {
        const daysFetched = await fetchDays();
        if (daysFetched) {
            res.status(200).json(daysFetched);
        } else {
            res.status(400).json({ dbError: "not found!" });
        }

    } catch (error) {
        res.status(400).json({ error: error });
    }

}
module.exports = { showDays };
