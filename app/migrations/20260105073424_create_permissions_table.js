/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("permissions", function (table) {
    table.specificType("id", "INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY");
    table.integer("role_ID").notNullable();
    table.integer("privilege_ID").notNullable();
    table.integer("module_ID").notNullable();
    table.foreign("role_ID").references("id").inTable("roles");
    table.foreign("privilege_ID").references("id").inTable("privileges");
    table.foreign("module_ID").references("id").inTable("modules");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
