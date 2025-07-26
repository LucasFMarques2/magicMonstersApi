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

  const monsters = await knex('monsters').insert([
    {
      name: 'fanstamão',
      hp: 100,
      attack: 20,
      defense: 5,
      speed: 20,
      special_attack_name: "Raio do medo",
      special_attack_damage: 40,
      gif_default:
        'https://res.cloudinary.com/dmvhqaow3/image/upload/v1753551552/monsters/olxobyzub0pt3csqrlil.gif',
      gif_attack:
        'https://res.cloudinary.com/dmvhqaow3/image/upload/v1753551553/monsters/ug2jb7xxh1lljntj1gd4.gif',
      gif_defend:
        'https://res.cloudinary.com/dmvhqaow3/image/upload/v1753551553/monsters/coub8apgyo8qdkijtqny.gif',
      gif_special:
        'https://res.cloudinary.com/dmvhqaow3/image/upload/v1753551553/monsters/mv2agaceyre8gdsifj6j.gif',
      gif_hit:
        'https://res.cloudinary.com/dmvhqaow3/image/upload/v1753551552/monsters/us77ledmjj48ybw1djyn.gif',
    },
  ]).returning('*')

   console.log('Monstro criado:', monsters)}

