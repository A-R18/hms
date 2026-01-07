const { authenticateUser } = require('../models/login.model.js');
const { generateToken } = require('../controllers/tokenGenerator.js');
const bcrypt = require('bcrypt');
const logUserIn = async (req, res) => {
  const mail = req.body.email;
  const pass = req.body.password;
  const authResponse = await authenticateUser(mail);
  if (!authResponse) {
    return res.status(404).json({ message: "User doesn't exist!" });
  } else {
    const matchedPassword = await bcrypt.compare(pass, authResponse.user_password);
    if (!matchedPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    } else {
      return res.status(202).json({ message: 'Logged in successfully!' });
    }
  }
};

module.exports = { logUserIn };
