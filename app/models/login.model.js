const knex = require("knex")(require("../config/dbMod.js"));
const bcrypt = require("bcrypt");

const authenticateUser = async (userEmail, userPassword) => {
    const result = knex("users").where({ user_email: userEmail }).select("users.user_password", "users.user_email").first();
    console.log(result);
    if (result) {

        const passwordMatched = bcrypt.compare(userPassword, result.user_password);
        if (!passwordMatched) {
            return "didn't match" ;
        }
         return "Success" ;
    }
    return "Email doesn't exist"
}
module.exports = { authenticateUser };