const BattleService = require('../../core/services/battleServices/battleService')

const battleActionsHandler = (io, socket) => {
  const onBattleAction = async data => {
    const { battleId, playerId, actionType } = data

    if (!battleId || !playerId || !actionType) {
      return socket.emit('battle_error', {
        message: 'Dados da ação inválidos.',
      })
    }

    try {
      const updatedBattle = await BattleService.performAction(
        battleId,
        playerId,
        actionType
      )

      const battleRoomId = `battle_${battleId}`

      io.to(battleRoomId).emit('battle_update', {
        battle: updatedBattle,
        lastAction: {
          playerId: playerId,
          type: actionType,
        },
      })

      if (updatedBattle.status === 'finished') {
        io.to(battleRoomId).emit('battle_end', {
          message: `A batalha terminou! O vencedor é o jogador ${updatedBattle.winner_id}!`,
          battle: updatedBattle,
        })
      }
    } catch (error) {
      console.error(
        `[Batalha ${battleId}] Erro na ação do jogador ${playerId}:`,
        error.message
      )

      socket.emit('battle_error', { message: error.message })
    }
  }

  socket.on('battle_action', onBattleAction)
}

module.exports = battleActionsHandler
