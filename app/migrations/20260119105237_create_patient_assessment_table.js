/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("patients_assessments", function (table) {
    table.increments("id");
    table.integer("patient_ID").unsigned();
    table.integer("treating_doctor_ID").unsigned();
    table.integer("appointment_ID").unsigned();
    table.text("patient_complaint").notNullable();
    table.text("past_medical_history").notNullable();
    table.enum("consciousness", ["alert", "verbal", "pain", "unresponsive"]).notNullable();
    table.decimal("temperature", 4, 1).notNullable();
    table.decimal("breathing_rate", 4, 1).notNullable();
    table.smallint("systolic_bp").unsigned().notNullable();
    table.smallint("diastolic_bp").unsigned().notNullable();
    table.smallint("pulse").unsigned().notNullable();
    // table.tinyint("o2_saturation").unsigned().notNullable();
    // table
    //   .enum("saturation_on", ["room_air", "o2_support", "ventilator"])
    //   .notNullable()
    //   .defaultTo("room_air");
    table.timestamp("assessment_time").notNullable();
    table.unique(["patient_ID","treating_doctor_ID","appointment_ID"], "single_assessment");
    table.foreign("patient_ID").references("id").inTable("patients");
    table.foreign("appointment_ID").references("id").inTable("appointments");
    table.foreign("treating_doctor_ID").references("id").inTable("doctors");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
