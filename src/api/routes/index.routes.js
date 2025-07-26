const { Router } = require('express')

const characterRoutes = require('./characterRoutes')
const playerRoutes = require('./playerRoutes')
const monsterRoutes = require('./monsterRoutes')

const router = Router()

router.use('/character', characterRoutes)
router.use('/player', playerRoutes)
router.use('/monster', monsterRoutes)

module.exports = router
