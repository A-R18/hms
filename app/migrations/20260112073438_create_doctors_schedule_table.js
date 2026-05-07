/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("doctors_scheduling", function (table) {
    table.specificType("id", "INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY");
    table.integer("doctor_ID");
    table.integer("doctor_day_ID");
    table.time("doctor_from_time").notNullable();
    table.time("doctor_to_time").notNullable();
    table.date("doc_from_date").notNullable();
    table.date("doc_to_date").notNullable();
    table.integer("doc_slot_dur").notNullable();
    table.check("doc_slot_dur > 0");
    table.foreign("doctor_ID").references("id").inTable("doctors");
    table.foreign("doctor_day_ID").references("id").inTable("days");
    table.unique(["doctor_ID", "doc_from_date", "doc_to_date", "doctor_day_ID"], "uniqueConst");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
