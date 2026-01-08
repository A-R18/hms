const jwt = require("jsonwebtoken");
const authorize = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token);
    if (!token) {
        return res.status(401).json({ message: "NTP, not authorized!" });
    } else {
        const secret = process.env.SECRET_KEY_JWT;
        const decodedData = jwt.verify(token, secret);
        req.user = decodedData;
        next();
    }
}

module.exports = authorize;