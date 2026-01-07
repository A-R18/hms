const jwt = require('jsonwebtoken');

const generateToken = (userID, userName, userRole, userEmail, permissions) => {
  const token = jwt.sign(
    {
      id: userID,
      name: userName,
      role: userRole,
      email: userEmail,
      permissions: permissions,
    },
    process.env.SECRET_KEY_JWT,
    {
      expiresIn: '1h',
    }
  );
  return token;
};

module.exports = { generateToken };
