/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('players').del()
  await knex('monsters').del()
  await knex('characters').del()

  const characters = await knex('characters')
    .insert([
      {
        name: 'Cavaleiro DNC',
        gif_url:
          'https://res.cloudinary.com/dmvhqaow3/image/upload/v1753498828/characters/s5kivrxvge2mn28qprdr.gif',
      },
      {
        name: 'Mago DNC',
        gif_url:
          'https://res.cloudinary.com/dmvhqaow3/image/upload/v1753499067/characters/fyltwvoz0vczfoavkb5j.gif',
      },
    ])
    .returning('*')

  console.log('Personagens criados:', characters)

}
