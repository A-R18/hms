/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("doctors_travel_advisory_to_patients", function (table) {
    table.increments("id");
    table.integer("prescription_ID").unsigned();
    table.enum("travel_recommendation", ["can_fly", "cannot_fly"]).nullable();
    table
      .enum("travel_requirement", [
        "ordinary_seat",
        "wheelChair_assistance",
        "stretcher_Case",
        "business_class_or_space",
      ])
      .nullable();
    table
      .enum("travelling_company_required", ["none", "non_medical_escort", "medical_escort"])
      .nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.foreign("prescription_ID").references("id").inTable("doctors_prescriptions");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
