/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("patients", function (table) {
    table.increments("id");
    table.string("patient_name", 80).notNullable();
    table.string("condition", 150).notNullable();
    table.string("contact",15).notNullable();
    table.timestamp("created_at").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
