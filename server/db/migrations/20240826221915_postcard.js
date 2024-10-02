/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('postcard', (table) => {
    table.increments('id')
    table.string('from')
    table.string('phone')
    table.string('material')
    table.string('date')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('postcard')
}
