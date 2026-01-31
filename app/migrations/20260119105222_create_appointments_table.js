/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("appointments", function (table) {
    table.increments("id");
    table.integer("patient_ID").unsigned();
    table.integer("doctor_ID").unsigned();
    table.integer("schedule_ID").unsigned();
    table.date("appointment_date").notNullable();
    table.time("appointment_time").notNullable();
    table
      .enum("appointment_status", ["pending", "confirmed", "attended"])
      .defaultTo("pending")
      .notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());

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
