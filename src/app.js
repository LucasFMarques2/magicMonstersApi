const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const mainRouter = require('./api/routes/index.routes')

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger-output.json')

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'API Batalha de Monstros está funcionando!' })
})

app.use('/api', mainRouter)

module.exports = app
