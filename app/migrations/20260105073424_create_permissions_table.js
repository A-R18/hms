/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('permissions', function (table) {
    table.increments('id');
    table.integer('role_ID').unsigned().notNullable();
    table.integer('privilege_ID').unsigned().notNullable();
    table.integer('module_ID').unsigned().notNullable();
    table.foreign('role_ID').references('id').inTable('roles');
    table.foreign('privilege_ID').references('id').inTable('privileges');
    table.foreign('module_ID').references('id').inTable('modules');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
