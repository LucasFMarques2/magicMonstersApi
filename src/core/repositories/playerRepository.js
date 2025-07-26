const knex = require('../../config/database')

const playerRepository = {
  findByName: name => {
    return knex('players').where({ name }).first()
  },

  findById: id => {
    return knex('players')
      .select(
        'players.id',
        'players.name',
        'players.character_id',
        'characters.name as character_name',
        'characters.gif_url as character_gif_url'
      )
      .join('characters', 'players.character_id', 'characters.id')
      .where('players.id', id)
      .first()
  },

  create: playerData => {
    return knex('players').insert(playerData).returning('*')
  },

  deleteById: id => {
    return knex('players').where({ id }).del()
  },
}

module.exports = playerRepository
