const express = require('express')
const router = express.Router()
const characterController = require('../controllers/characterController')
const { upload } = require('../../infra/cloudinary')

router.get('/characters', characterController.listCharacters)

router.post(
  '/characters',
  upload.single('gif'),
  characterController.createCharacter
)

module.exports = router
