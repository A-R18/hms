/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("patients_assessments", function (table) {
    table.specificType("id", "INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY");
    table.integer("patient_ID");
    table.integer("treating_doctor_ID");
    table.integer("appointment_ID");
    table.text("patient_complaint").notNullable();
    table.text("past_medical_history").notNullable();
    table
      .text("consciousness")
      .notNullable()
      .defaultTo("alert")
      .checkIn(["alert", "verbal", "pain", "unresponsive"]);
    table.decimal("temperature", 4, 1).notNullable();
    table.decimal("breathing_rate", 4, 1).notNullable();
    table.decimal("systolic_bp", 3, 1).notNullable();
    table.decimal("diastolic_bp", 3, 1).notNullable();
    table.decimal("pulse").notNullable();
    table.check("temperature > 0");
    table.check("breathing_rate > 0");
    table.check("systolic_bp > 0");
    table.check("diastolic_bp > 0");
    table.check("pulse > 0");
    // table.tinyint("o2_saturation").unsigned().notNullable();
    // table
    //   .enum("saturation_on", ["room_air", "o2_support", "ventilator"])
    //   .notNullable()
    //   .defaultTo("room_air");
    table.timestamp("assessment_time", { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.unique(["patient_ID", "treating_doctor_ID", "appointment_ID"], "single_assessment");
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
