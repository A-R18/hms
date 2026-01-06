const {authenticateUser} = require("../models/login.model.js");
const logUserIn = async (req, res) => {
    const mail = req.body.email;
    const pass = req.body.password;
    await authenticateUser(mail, pass);

}


module.exports = { logUserIn }