/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("doctors", function (table) {
        table.increments("id");
        table.integer("user_ID").unsigned().notNullable();
        table.string(50, "specialization").notNullable();
        table.string(50, "contact").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

};
