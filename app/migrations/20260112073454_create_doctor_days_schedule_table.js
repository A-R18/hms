/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("doctors_day_schedule", function (table) {
        table.increments("id");
        table.integer("schedule_ID").unsigned();
        table.integer("doc_sch_day_ID").unsigned();
        table.foreign("schedule_ID").references("id").inTable("doctors_scheduling");
        table.foreign("doc_sch_day_ID").references("id").inTable("days");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

};
