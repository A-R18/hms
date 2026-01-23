/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("patients_allergies", function (table) {
    table.increments("id");
    table.integer("patient_ID").unsigned();
    table.integer("allergy_ID").unsigned();
    table.foreign("patient_ID").references("id").inTable("patients");
    table.foreign("allergy_ID").references("id").inTable("allergies");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
