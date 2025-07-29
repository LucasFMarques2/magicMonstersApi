const characterRepository = require('../../core/repositories/characterRepository')
const { uploadToCloudinary } = require('../../infra/cloudinary')

const characterController = {
  async listCharacter(req, res) {
    try {
      const characters = await characterRepository.findAll()
      return res.status(200).json(characters)
    } catch (error) {
      console.error('Erro ao listar personagens:', error)
      return res.status(500).json({ error: 'Falha ao buscar personagens.' })
    }
  },

  async createCharacter(req, res) {
    const { name } = req.body
    const file = req.file

    if (!name || !file) {
      return res
        .status(400)
        .json({ error: 'Nome do personagem e arquivo GIF são obrigatórios.' })
    }

    try {
      const existingCharacter = await characterRepository.findByName(name)
      if (existingCharacter) {
        return res
          .status(409)
          .json({ error: `O personagem com o nome '${name}' já existe.` })
      }

      const result = await uploadToCloudinary(file.buffer, 'characters')

      const [newCharacter] = await characterRepository.create({
        name: name,
        gif_url: result.secure_url,
      })

      return res.status(201).json(newCharacter)
    } catch (error) {
      console.error('Erro ao criar personagem:', error)
      return res.status(500).json({ error: 'Falha ao criar personagem.' })
    }
  },
}

module.exports = characterController
