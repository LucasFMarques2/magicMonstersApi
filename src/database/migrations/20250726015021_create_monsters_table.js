/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('monsters', table => {
    table.increments('id').primary()
    table.string('name', 20).notNullable()
    table.integer('hp').notNullable().defaultTo(100)
    table.integer('attack').notNullable()
    table.integer('defense').notNullable()
    table.integer('speed').notNullable()
    table.string('special_attack_name').notNullable()
    table.integer('special_attack_damage').notNullable().defaultTo(40)
    table.text('gif_default').notNullable()
    table.text('gif_attack').notNullable()
    table.text('gif_defend').notNullable()
    table.text('gif_special').notNullable()
    table.text('gif_hit').notNullable()
    table
      .text('gif_death')
      .notNullable()
      .defaultTo(
        'https://res.cloudinary.com/dmvhqaow3/image/upload/v1753548904/Death_yhwi7z.gif'
      )
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('monsters')
}
