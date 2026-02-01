const jwt = require("jsonwebtoken");

const generateToken = (userData) => {
  try {
    const token = jwt.sign(userData, process.env.SECRET_KEY_JWT, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    return error.message;
  }
};

module.exports = { generateToken };
