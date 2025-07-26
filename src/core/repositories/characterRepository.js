const knex = require('../../config/database')

const characterRepository = {
  findAll: () => {
    return knex('characters').select('*')
  },

  findByName: name => {
    return knex(characters).where({ name }).first()
  },

  findById: id => {
    return knex('characters').where({ id }).first()
  },

  create: characterData => {
    return knex('characters').insert(characterData).returning('*')
  },
}

module.exports = characterRepository
