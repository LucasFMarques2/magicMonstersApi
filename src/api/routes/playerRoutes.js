const express = require('express')
const router = express.Router()
const playerController = require('../controllers/playerController')

router.get(
  '/:id',
  /* #swagger.tags = ['Players'] */
  playerController.getPlayerById
)

router.post(
  '/',
  /* #swagger.tags = ['Players'] */
  playerController.creatPlayer
)

router.delete(
  '/:id',
  /* #swagger.tags = ['Players'] */
  playerController.deletePlayer
)

module.exports = router
