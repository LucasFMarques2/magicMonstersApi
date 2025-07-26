const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'API Magic Monsters',
    description:
      'Documentação da API de Magic Monsters um jogo de turno online.',
  },
  host: 'localhost:3333',
  schemes: ['http'],
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./src/api/routes/index.routes.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
