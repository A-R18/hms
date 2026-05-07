/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("doctors_travel_advisory_to_patients", function (table) {
    table.increments("id", "INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY");
    table.integer("prescription_ID");
    table.text("travel_recommendation").checkIn(["can_fly", "cannot_fly"]).nullable();
    table
      .text("travel_requirement")
      .checkIn([
        "ordinary_seat",
        "wheelChair_assistance",
        "stretcher_Case",
        "business_class_or_space",
      ])
      .nullable();
    table
      .text("travelling_company_required")
      .checkIn(["none", "non_medical_escort", "medical_escort"])
      .nullable();
    table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    table.foreign("prescription_ID").references("id").inTable("doctors_prescriptions");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
