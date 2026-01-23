const { body, param } = require("express-validator");
const validateUserData = [
  body("name")
    .notEmpty()
    .withMessage("Required, named can't be empty")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Invalid name entered"),

  body("email")
    .notEmpty()
    .withMessage("Email can't be empty")
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password can't be empty").trim(),
];

const validateUpdatedUser = [
  param("id")
    .optional()
    .notEmpty()
    .withMessage("Required, param can't be empty")
    .isInt()
    .withMessage("Invalid param type!"),

  body("name")
    .optional()
    .notEmpty()
    .withMessage("Required, named can't be empty")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Invalid name entered"),

  body("email")
    .optional()
    .notEmpty()
    .withMessage("Email can't be empty")
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),

  body("password").optional().notEmpty().withMessage("Password can't be empty").trim(),
];

module.exports = { validateUserData, validateUpdatedUser };
