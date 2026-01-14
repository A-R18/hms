const jwt = require("jsonwebtoken");
const authorize = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "NTP, not authorized!" });
  } else {
    try {
      
      const secret = process.env.SECRET_KEY_JWT;
      const decodedData = jwt.verify(token, secret);
      req.user = decodedData;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired, please login again!" });
      }
    }

  }
};

module.exports = authorize;
