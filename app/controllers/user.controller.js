const { saveUser } = require("../models/user.model.js");
const registerUser = async (res, req) => {
    const incomingData = req.body;
    console.log(req.body);
    const dataMatch = {
        user_name: incomingData.name,
        user_email: incomingData.email,
        user_email: incomingData.password
    }

    const userSubmitted = await saveUser(dataMatch);
    if (userSubmitted) {
        return res.status(200).json({ message: "User registered", user_Data: userSubmitted });
    }
    return res.status(400).json({ error: "Unsuccessfull attempt"});
}


module.exports = { registerUser };