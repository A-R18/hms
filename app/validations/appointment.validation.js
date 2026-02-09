const { body } = require("express-validator");

const appointmentValidations = [
    body("doc_apt_date")
        .notEmpty()
        .withMessage("Appointment date must be provided")
        .isDate()
        .withMessage("Field must be a date"),

    body("apt_time")
        .notEmpty()
        .withMessage("Appointment time must be specified")
        .isTime()
        .withMessage("Field must be time"),

    body("apt_status")
        .notEmpty()
        .withMessage("Appointment status must be specified")
        .isIn(["pending", "confirmed", "attended"])
        .withMessage("Invalid status specified, should be pending")

];

const changeAptValidations = [

    body("ed_apt_Date")
        .optional()
        .notEmpty()
        .withMessage("Appointment time must be specified")
        .isTime()
        .withMessage("Field must be a date"),

    body("ed_apt_Time")
        .optional()
        .notEmpty()
        .withMessage("Appointment time must be specified")
        .isTime()
        .withMessage("Field must be time"),
];

module.exports = { appointmentValidations, changeAptValidations };