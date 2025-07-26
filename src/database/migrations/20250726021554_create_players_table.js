/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable('players', table => {
    table.increments('id').primary()
    table.string('name', 20).unique().notNullable()
    table
      .integer('character_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('characters')
      .onDelete('CASCADE')

    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('players')
}
