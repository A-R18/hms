const jwt = require("jsonwebtoken");

const generateToken = (userData) => {
  const token = jwt.sign(userData, process.env.SECRET_KEY_JWT, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = { generateToken };