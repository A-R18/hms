/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("doctors_prescriptions", function(table){
    table.increments("id");
    table.integer("doctor_ID").unsigned();
    table.integer("patient_ID").unsigned();
    table.integer("appointment_ID").unsigned();
    table.text("doctor_note", 2000).notNullable(); //assessment diagnosis equivalent
    table.text("treatment_plan").notNullable();
    table.text("other_examinations").notNullable();
    table.time("prescription_time").notNullable();
    table.foreign("doctor_ID").references("id").inTable("doctors");
    table.foreign("patient_ID").references("id").inTable("patients");
    table.foreign("appointment_ID").references("id").inTable("appointments");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
