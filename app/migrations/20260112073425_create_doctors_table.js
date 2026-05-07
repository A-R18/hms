/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("doctors", function (table) {
    table.specificType("id", "INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY");
    table.integer("user_ID").notNullable();
    table.integer("spec_ID").nullable();
    table.string("contact", 15).notNullable();
    table.foreign("user_ID").references("id").inTable("users").onDelete("CASCADE");
    table.foreign("spec_ID").references("id").inTable("doctor_specialities");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
