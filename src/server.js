require('dotenv').config()

const http = require('http')
const { Server } = require('socket.io')
const app = require('./app')

const PORT = process.env.PORT || 3333

const httpServer = http.createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', socket => {
  console.log(`✅ Usuário conectado: ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`❌ Usuário desconectado: ${socket.id}`)
  })
})

httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
  console.log(`🔗 Acesse http://localhost:${PORT}/api para testar a API.`)
})
