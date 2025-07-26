const { Router } = require('express')

const characterRoutes = require('./characterRoutes')
const playerRoutes = require('./playerRoutes')
//const monsterRoutes = require('./monsterRoutes')

const router = Router()

router.use(characterRoutes)
router.use(playerRoutes)
//router.use(monsterRoutes)

module.exports = router
