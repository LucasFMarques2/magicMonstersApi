const playerRepository = require('../../core/repositories/playerRepository')
const characterRepository = require('../../core/repositories/characterRepository')
const knex = require('../../config/database')

const playerController = {
  async creatPlayer(req, res) {
    const { name, character_id } = req.body

    if (!name || !character_id) {
      return res
        .status(400)
        .json({ error: 'Nome e personagem são obrigatórios.' })
    }

    try {
      const characterExists = await characterRepository.findById(
        character_id
      )
      if (!characterExists) {
        return res.status(404).json({ error: 'Personagem não encontrado.' })
      }

      const nameExists = await playerRepository.findByName(name)
      if (nameExists) {
        return res
          .status(409)
          .json({ error: `O nome de jogador '${name}' já está em uso.` })
      }

      const [newPlayer] = await playerRepository.create({ name, character_id })

      return res.status(201).json(newPlayer)
    } catch (error) {
      console.error('Erro ao criar jogador:', error)
      return res.status(500).json({ error: 'Falha ao criar jogador.' })
    }
  },

  async getPlayerById(req, res) {
    const { id } = req.params

    try {
      const player = await playerRepository.findById(id)

      if (!player) {
        return res.status(404).json({ error: 'Jogador não encontrado.' })
      }

      return res.status(200).json(player)
    } catch (error) {
      console.error('Erro ao buscar jogador:', error)
      return res.status(500).json({ error: 'Falha ao buscar jogador.' })
    }
  },

  async deletePlayer(req, res) {
    const { id } = req.params

    try {
      const deletedCount = await playerRepository.deleteById(id)
      if (deletedCount === 0) {
        return res.status(404).json({ error: 'Jogador não encontrado.' })
      }
      return res.status(200).send({ message: 'Usuário deletado com êxito'})
    } catch (error) {
      console.error('Erro ao deletar jogador:', error)
      return res.status(500).json({ error: 'Falha ao deletar jogador.' })
    }
  },
}

module.exports = playerController
