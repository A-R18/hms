/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("users", function (table) {
        table.increments("id");
        table.integer("role_ID").unsigned();
        table.string("user_name").notNullable();
        table.string("user_email").unique().notNullable();
        table.string("user_password").notNullable();
        table.timestamps("true");
        table.foreign("role_ID").references("id").inTable("roles");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

};
