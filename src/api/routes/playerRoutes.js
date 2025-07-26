const express = require('express')
const router = express.Router()
const playerController = require('../controllers/playerController')

router.get('/player/:id', playerController.getPlayerById)

router.post('/player', playerController.creatPlayer)

router.delete('/player/:id', playerController.deletePlayer)

module.exports = router
