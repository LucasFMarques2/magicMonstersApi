/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('battles', table => {
    table.increments('id').primary()
    
    table.integer('arena_id').notNullable()

    table
      .integer('player1_id')
      .unsigned()
      .references('id')
      .inTable('players')
      .onDelete('SET NULL')
    table
      .integer('monster1_id')
      .unsigned()
      .references('id')
      .inTable('monsters')
      .onDelete('SET NULL')

    table
      .integer('player2_id')
      .unsigned()
      .references('id')
      .inTable('players')
      .onDelete('SET NULL')
    table
      .integer('monster2_id')
      .unsigned()
      .references('id')
      .inTable('monsters')
      .onDelete('SET NULL')
    table
      .integer('winner_id')
      .unsigned()
      .references('id')
      .inTable('players')
      .onDelete('SET NULL')
      .nullable()
    table
      .integer('current_turn_player_id')
      .unsigned()
      .references('id')
      .inTable('players')
      .onDelete('SET NULL')
    table.string('status', 50).notNullable().defaultTo('waiting_for_opponent')

    table.jsonb('battle_state')

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('finished_at').nullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('battles')
}
