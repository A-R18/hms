const { userSubmitted } = require("../models/user.model.js");
const registerUser = async (res, req) => {
    const incomingData = req.body;
    const dataMatch = {

    }

    const userSubmitted = await registerUser(dataMatch);
}


module.exports = { registerUser };