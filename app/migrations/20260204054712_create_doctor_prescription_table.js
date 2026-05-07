/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("doctors_prescriptions", function (table) {
    table.specificType("id", "INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY");
    table.integer("doctor_ID");
    table.integer("patient_ID");
    table.integer("appointment_ID");
    table.text("doctor_note", 2000).notNullable(); //assessment diagnosis equivalent
    table.text("treatment_plan").notNullable();
    table.text("other_examinations").notNullable();
    table.time("prescription_time", { useTz: true }).notNullable().defaultTo(knex.fn.now()).notNullable();
    table.foreign("doctor_ID").references("id").inTable("doctors");
    table.foreign("patient_ID").references("id").inTable("patients");
    table.foreign("appointment_ID").references("id").inTable("appointments");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) { };
