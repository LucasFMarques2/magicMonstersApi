const knex = require('../../config/database')

const battleRepository = {
  /**
   * @param {object} battleData
   */
  create: battleData => {
    return knex('battles').insert(battleData).returning('*')
  },

  /**
   * @param {number} id
   */
  findById: id => {
    return knex('battles').where({ id }).first()
  },

  /**
   * @param {number} id
   * @param {object} battleData
   * 
   */
  update: (id, battleData) => {
    return knex('battles').where({ id }).update(battleData).returning('*')
  },
}

module.exports = battleRepository
