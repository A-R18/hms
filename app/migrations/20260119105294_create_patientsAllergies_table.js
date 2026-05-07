/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("patients_allergies", function (table) {
    table.specificType("id", "INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY");
    table.integer("patient_ID");
    table.integer("allergy_ID");
    table.unique(["patient_ID", "allergy_ID"]);
    table.foreign("patient_ID").references("id").inTable("patients");
    table.foreign("allergy_ID").references("id").inTable("allergies");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
