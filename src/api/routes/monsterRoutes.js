const express = require('express')
const router = express.Router()
const monsterController = require('../controllers/monsterController')
const { upload } = require('../../infra/cloudinary')

// #swagger.tags = ['Monsters']

const gifFields = [
  { name: 'gif_default', maxCount: 1 },
  { name: 'gif_attack', maxCount: 1 },
  { name: 'gif_defend', maxCount: 1 },
  { name: 'gif_special', maxCount: 1 },
  { name: 'gif_hit', maxCount: 1 },
]

router.get(
  '/:id',
  /* #swagger.tags = ['Monsters'] */
  monsterController.getMonsterById
)

router.get(
  '/',
  /* #swagger.tags = ['Monsters'] */
  monsterController.listMonsters
)

router.post(
  '/',
  upload.fields(gifFields),
  /* #swagger.tags = ['Monsters'] */
  /*
    #swagger.tags = ['Monster']
    #swagger.description = 'Cria um novo monstro.'
    #swagger.consumes = ['multipart/form-data']
    #swagger.parameters['name'] = { in: 'formData', type: 'string', required: true }
    #swagger.parameters['attack'] = { in: 'formData', type: 'integer', required: true }
    #swagger.parameters['defense'] = { in: 'formData', type: 'integer', required: true }
    #swagger.parameters['speed'] = { in: 'formData', type: 'integer', required: true }
    #swagger.parameters['gif_default'] = { in: 'formData', type: 'file', required: true }
    #swagger.parameters['gif_attack'] = { in: 'formData', type: 'file', required: true }
    #swagger.parameters['gif_defend'] = { in: 'formData', type: 'file', required: true }
    #swagger.parameters['gif_special'] = { in: 'formData', type: 'file', required: true }
    #swagger.parameters['gif_hit'] = { in: 'formData', type: 'file', required: true }
  */
  monsterController.createMonsters
)

module.exports = router
