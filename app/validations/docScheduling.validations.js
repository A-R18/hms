const { body, param } = require("express-validator");

const validateDoctorScheduling = [
    body("docID")
        .notEmpty()
        .withMessage("Doctor Id (FK) must be provided")
        .isNumeric()
        .withMessage("Doctor Id (FK) must be numeric")
    ,

    body("doc_day")
        .notEmpty()
        .withMessage("Day Id (FK) must be provided")
        .isNumeric()
        .withMessage("Day Id (FK) must be numeric")
    ,

    body("from_time")
        .notEmpty()
        .withMessage("From time must be provided")
        .isTime()
        .withMessage("field must be time (from time)"),

    body("to_time")
        .notEmpty()
        .withMessage("To time must be provided")
        .isTime()
        .withMessage("field must be time (to time)"),

    body("from_date")
        .notEmpty()
        .withMessage("From date must be provided")
        .isDate()
        .withMessage("field must be date (from date)")
    ,

    body("to_date")
        .notEmpty()
        .withMessage("To date must be provided")
        .isDate()
        .withMessage("field must be date (to date)")
    ,

    body("slot_duration")
        .notEmpty()
        .withMessage("Slot duration must be provided")
        .isNumeric()
        .withMessage("slot duration must be numeric")
    ,
];


const validateDoctorSchedulingUpdate = [
    
    body("from_time")
        .optional()
        .notEmpty()
        .withMessage("From time must be provided")
        .isTime()
        .withMessage("field must be time (from time)"),

    body("to_time")
        .optional()
        .notEmpty()
        .withMessage("To time must be provided")
        .isTime()
        .withMessage("field must be time (to time)"),

    body("from_date")
        .optional()
        .notEmpty()
        .withMessage("From date must be provided")
        .isDate()
        .withMessage("field must be date (from date)")
    ,

    body("to_date")
        .optional()
        .notEmpty()
        .withMessage("To date must be provided")
        .isDate()
        .withMessage("field must be date (to date)")
    ,

    body("slot_duration")
        .optional()
        .notEmpty()
        .withMessage("Slot duration must be provided")
        .isNumeric()
        .withMessage("slot duration must be numeric")
    ,
];

module.exports = { validateDoctorScheduling, validateDoctorSchedulingUpdate };