/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("appointments", function (table) {
    table.increments("id");
    table.integer("patient_ID").unsigned();
    table.integer("doctor_ID").unsigned();
    table.date("appointment_date").notNullable();
    table.time("appointment_time").notNullable();
    table
      .enum("appointment_status", ["pending", "confirmed", "attended"])
      .defaultTo("pending")
      .notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
