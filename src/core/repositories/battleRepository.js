const knex = require('../../config/database')

const battleRepository = {
  create: battleData => {
    return knex('battles').insert(battleData).returning('*')
  },

  findById: id => {
    return knex('battles').where({ id }).first()
  },

  update: (id, battleData) => {
    return knex('battles').where({ id }).update(battleData).returning('*')
  },
}

module.exports = battleRepository
