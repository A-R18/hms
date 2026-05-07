/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    // table.increments("id");
    table.specificType("id", "INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY");
    table.integer("role_ID");
    table.string("user_name").notNullable();
    table.string("user_email").unique().notNullable();
    table.string("user_password").notNullable();
    table.timestamps({ useTz: true }, true);
    table.foreign("role_ID").references("id").inTable("roles");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
