const express = require('express')
const router = express.Router()
const characterController = require('../controllers/characterController')
const { upload } = require('../../infra/cloudinary')

router.get(
  '/',
  /* #swagger.tags = ['Character'] */ characterController.listCharacters
)

router.post(
  '/character',
  upload.single('gif'),
  /*
    #swagger.tags = ['Character']
    #swagger.description = 'Cria um novo personagem.'
    #swagger.consumes = ['multipart/form-data']
    #swagger.parameters['name'] = {
        in: 'formData',
        type: 'string',
        required: true,
        description: 'Nome do personagem.'
    }
    #swagger.parameters['gif'] = {
        in: 'formData',
        type: 'file',
        required: true,
        description: 'Arquivo GIF do personagem.'
    }
  */
  characterController.createCharacter
)

module.exports = router
