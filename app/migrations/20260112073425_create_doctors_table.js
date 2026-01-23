/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("doctors", function (table) {
    table.increments("id");
    table.integer("user_ID").unsigned().notNullable();
    table.integer("spec_ID").unsigned().nullable();
    table.integer("contact").notNullable();
    table.foreign("user_ID").references("id").inTable("users").onDelete("CASCADE");
    table.foreign("spec_ID").references("id").inTable("doctor_specialities");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
