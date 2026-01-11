const { authenticateUser, fetchUserRole, fetchUserPermissions } = require("../models/login.model.js");
const { generateToken } = require("../controllers/tokenGenerator.js");
const bcrypt = require("bcrypt");
const logUserIn = async (req, res) => {
  const mail = req.body.email;
  const pass = req.body.password;
  const authResponse = await authenticateUser(mail);

  // console.log("authenticated data is: ",authData);
  if (!authResponse) {
    return res.status(404).json({ message: "User doesn't exist!" });
  } else {
    const userRole = await fetchUserRole(authResponse.role_ID);
    
    const permissions = await fetchUserPermissions(authResponse.role_ID);
    const formattedPermz = [];
    permissions.map((p) => {
      formattedPermz.push(`${p.module}/${p.privilege}`);
    });
    const authData = {
      id: authResponse.id,
      role_id: authResponse.role_ID,
      role: userRole.role,
      email: authResponse.user_email,
      password: authResponse.user_password,
    };
    const matchedPassword = await bcrypt.compare(pass, authResponse.user_password);
    if (!matchedPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    } else {
      const token = generateToken(authData);
      return res.status(202).json({
        message: "Logged in successfully!",
        ...authData, token: token, permissions: formattedPermz
      });
    }
  }
};

module.exports = { logUserIn };
