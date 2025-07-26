const knex = require('../../config/database')

const monsterRepository = {
  /**
   * @param {object} monsterData
   */
  
  create: monsterData => {
    return knex('monsters').insert(monsterData).returning('*')
  },

  findAll: () => {
    return knex('monsters').select('*')
  },

  findById: id => {
    return knex('monsters').where({ id }).first()
  },
}

module.exports = monsterRepository
