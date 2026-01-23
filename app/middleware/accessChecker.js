const { checkAccess } = require("../models/user.model.js");
const routeAction = (privilege, module) => {
  return async (req, res, next) => {
    // console.log(req.user);

    const roleID = req.user.role_id;
    const accessAlloted = await checkAccess(privilege, module, roleID);
    if (!accessAlloted) {
      return res.status(403).json({ message: "Access denied!" });
    }
    next();
  };
};

module.exports = { routeAction };
