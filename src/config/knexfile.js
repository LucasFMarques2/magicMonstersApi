const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') })

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: '../database/migrations',
    },
    seeds: {
      directory: '../database/seeds',
    },
  },
}
