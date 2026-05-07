/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("appointments", function (table) {
    table.specificType("id", "INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY");
    table.integer("patient_ID");
    table.integer("doctor_ID");
    table.integer("schedule_ID");
    table.date("appointment_date").notNullable();
    table.time("appointment_time").notNullable();
    table
      .text("appointment_status")
      .notNullable()
      .defaultTo("pending")
      .checkIn(["pending", "confirmed", "attended"]);
    table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());

    table.foreign("patient_ID").references("id").inTable("patients");
    table.foreign("doctor_ID").references("id").inTable("doctors");
    table.foreign("schedule_ID").references("id").inTable("doctors_scheduling");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
