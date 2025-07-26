// src/infra/websockets/matchmakingHandler.js

const BattleService = require('../../core/services/battleServices/battleService')

const matchmakingQueue = []

const matchmakingHandler = (io, socket) => {
  const onFindMatch = async data => {
    console.log(
      `[Socket ${socket.id}] Jogador ${data.playerId} está procurando partida com o monstro ${data.monsterId}`
    )

    matchmakingQueue.push({
      socket: socket,
      playerData: data,
    })

    socket.emit('matchmaking_status', {
      message: 'Você está na fila. Procurando oponente...',
    })

    if (matchmakingQueue.length >= 2) {
      console.log('[Matchmaking] Oponentes encontrados! Iniciando batalha...')

      const player1 = matchmakingQueue.shift()
      const player2 = matchmakingQueue.shift()

      try {
        const arenaId = Math.random() < 0.5 ? 1 : 2

        const newBattle = await BattleService.startBattle(
          player1.playerData,
          player2.playerData,
          arenaId
        )
        const battleRoomId = `battle_${newBattle.id}`
        player1.socket.join(battleRoomId)
        player2.socket.join(battleRoomId)

        console.log(
          `[Matchmaking] Batalha ${newBattle.id} criada na sala ${battleRoomId}.`
        )

        io.to(battleRoomId).emit('match_found', {
          message: 'Partida encontrada! Prepare-se para a batalha!',
          battle: newBattle,
        })
      } catch (error) {
        console.error('[Matchmaking] Erro ao iniciar a batalha:', error)
        player1.socket.emit('matchmaking_error', {
          message: 'Não foi possível iniciar a partida.',
        })
        player2.socket.emit('matchmaking_error', {
          message: 'Não foi possível iniciar a partida.',
        })
      }
    }
  }

  const onCancelMatchmaking = () => {
    console.log(`[Socket ${socket.id}] Jogador cancelou a busca.`)

    const index = matchmakingQueue.findIndex(p => p.socket.id === socket.id)
    if (index !== -1) {
      matchmakingQueue.splice(index, 1)
      socket.emit('matchmaking_status', { message: 'Você saiu da fila.' })
    }
  }

  const onDisconnect = () => {
    onCancelMatchmaking()
  }

  socket.on('find_match', onFindMatch)
  socket.on('cancel_matchmaking', onCancelMatchmaking)
  socket.on('disconnect', onDisconnect)
}

module.exports = matchmakingHandler
