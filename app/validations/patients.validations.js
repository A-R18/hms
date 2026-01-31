const { body, param } = require("express-validator");
const validatePatientData = [
  body("p_name")
    .notEmpty()
    .withMessage("Patient name is required")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Patient name must comprise letters only"),

  body("p_condition")
    .notEmpty()
    .withMessage("Patient condition is required")
    .isString()
    .withMessage("Invalid entry, condition must be a string"),

  body("p_contact")
    .notEmpty()
    .withMessage("Contact is required")
    .isNumeric()
    .withMessage("Contact must be a number")
    .isLength({ min: 11, max: 13 })
    .withMessage("Contact must be 11 digits, i.e. 03XXXXXXXXX")
];
const validatePatientUpdateData = [
  param("id")
    .notEmpty()
    .withMessage("Required, id param can't be empty")
    .isInt()
    .withMessage("Invalid param type!"),

  body("p_name")
    .optional()
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Patient name must contain only letters"),

  body("p_condition")
    .optional()
    .isString()
    .withMessage("Condition must be a string"),

  body("p_contact")
    .optional()
    .isNumeric()
    .withMessage("Contact must be a number")
    .isLength({ min: 11, max: 13 })
    .withMessage("Contact must be 11 digits, i.e. 03XXXXXXXXX")
];

module.exports = { validatePatientData, validatePatientUpdateData };
