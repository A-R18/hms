/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("doctors", function (table) {
        table.increments("id");
        table.integer("user_ID").unsigned().notNullable();
        table.string("specialization", 50).notNullable();
        table.integer("contact").notNullable();
        table.foreign("user_ID").references("id").inTable("users");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

};
