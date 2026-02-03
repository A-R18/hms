/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("patient_assessment", function (table) {
    table.increments("id");
    table.integer("patient_ID").unsigned();
    table.integer("treating_doctor_ID").unsigned();
    table.integer("appointment_ID").unsigned();
    table.text("patient_complaint").notNullable();
    table.string("patient_allergies").nullable();
    table.text("past_medical_history").notNullable();
    table.enum("consciousness", ["alert", "verbal", "pain", "unresponsive"]).notNullable();
    table.decimal("temperature", 4, 1).notNullable();
    table.smallint("systolic_bp").unsigned().notNullable();
    table.smallint("diastolic_bp").unsigned().notNullable();
    table.smallint("pulse").unsigned().notNullable();
    table.tinyint("o2_saturation").unsigned().notNullable();
    table
      .enum("saturation_on", ["room_air", "o2_support", "ventilator"])
      .notNullable()
      .defaultTo("room_air");
    table.text("other_examinations").nullable();
    table.text("assessment_diagnosis").notNullable();//doc
    table.text("treatment_plan").notNullable();//doc
    table.text("doctor_note").nullable();//doc
    table.enum("travel_recommendation", ["can_fly", "cannot_fly"]).nullable();//doc
    table
      .enum("travel_requirement", [
        "ordinary_seat",
        "wheelChair_assistance",
        "stretcher_Case",
        "business_class_or_space",
      ])
      .nullable();//doc
    table
      .enum("travelling_company_required", ["none", "non_medical_escort", "medical_escort"])
      .nullable();//doc
    table.enum("doctor_advice_on_travel", ["required", "not_required"]).nullable();//doc
    table.string("doc_sign").notNullable();//doc
    table.date("assessment_date").notNullable();
    table.date("assessment_time").notNullable();//both
    table.foreign("patient_ID").references("id").inTable("patients");
    table.foreign("appointment_ID").references("id").inTable("appointments");
    table.foreign("treating_doctor_ID").references("id").inTable("doctors");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
