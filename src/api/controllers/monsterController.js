const monsterRepository = require('../../core/repositories/monsterRepository')
const { uploadToCloudinary } = require('../../infra/cloudinary')

const monsterController = {
  async createMonsters(req, res) {
    const { name, attack, defense, speed } = req.body
    const files = req.files

    if (!name || !attack || !defense || !speed) {
      return res
        .status(400)
        .json({ error: 'Nome, ataque, defesa e velocidade são obrigatórios.' })
    }
    if (!files || Object.keys(files).length < 5) {
      return res.status(400).json({
        error:
          'Todos os 6 GIFs (default, attack, defend, special, hit, death) são obrigatórios.',
      })
    }

    const totalPoints =
      parseInt(attack, 10) + parseInt(defense, 10) + parseInt(speed, 10)
    if (totalPoints !== 45) {
      return res.status(400).json({
        error: `A soma de ataque, defesa e velocidade deve ser 45. Soma atual: ${totalPoints}.`,
      })
    }
    if (attack < 5 || defense < 5 || speed < 5) {
      return res.status(400).json({
        error: 'Ataque, defesa e velocidade devem ter um valor mínimo de 5.',
      })
    }

    try {
      const uploadPromises = Object.values(files).map(fileArray =>
        uploadToCloudinary(fileArray[0].buffer, 'monsters')
      )
      const uploadResults = await Promise.all(uploadPromises)

      const gifUrls = {
        gif_default: uploadResults[0].secure_url,
        gif_attack: uploadResults[1].secure_url,
        gif_defend: uploadResults[2].secure_url,
        gif_special: uploadResults[3].secure_url,
        gif_hit: uploadResults[4].secure_url,
      }
      const monsterData = {
        name,
        attack: parseInt(attack, 10),
        defense: parseInt(defense, 10),
        speed: parseInt(speed, 10),
        hp: 100,
        special_attack_name: `${name}'`,
        ...gifUrls,
      }

      const [newMonster] = await monsterRepository.create(monsterData)

      res.status(201).json(newMonster)
    } catch (error) {
      console.error('Erro ao criar monstro:', error)
      res.status(500).json({ error: 'Falha ao criar monstro.' })
    }
  },

  async listMonsters(req, res) {
    try {
      const monsters = await monsterRepository.findAll()
      res.status(200).json(monsters)
    } catch (error) {
      console.error('Erro ao listar monstros:', error)
      res.status(500).json({ error: 'Falha ao buscar monstros.' })
    }
  },

  async getMonsterById(req, res) {
    const { id } = req.params

    try {
      const monster = await monsterRepository.findById(id)

      if (!monster) {
        return res.status(404).json({ error: 'Monstro não encontrado' })
      }

      return res.status(200).json(monster)
    } catch (error) {
      console.error('Erro ao buscar monstro:', error)
      return res.status(500).json({ error: 'Falha ao buscar monstro.'})
    }
  },
}

module.exports = monsterController
