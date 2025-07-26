const battleRepository = require('../../repositories/battleRepository')
const playerRepository = require('../../repositories/playerRepository')
const monsterRepository = require('../../repositories/monsterRepository')

const BattleService = {
  async startBattle(player1Data, player2Data, arenaId) {
    const [monster1, monster2] = await Promise.all([
      monsterRepository.findById(player1Data.monsterId),
      monsterRepository.findById(player2Data.monsterId),
    ])

    if (!monster1 || !monster2) {
      throw new Error('Um ou mais monstros não foram encontrados.')
    }

    let firstTurnPlayerId
    if (monster1.speed > monster2.speed) {
      firstTurnPlayerId = player1Data.playerId
    } else if (monster2.speed > monster1.speed) {
      firstTurnPlayerId = player2Data.playerId
    } else {
      firstTurnPlayerId =
        Math.random() < 0.5 ? player1Data.playerId : player2Data.playerId
    }
    const initialState = {
      turn: 1,
      player1: {
        id: player1Data.playerId,
        monsterId: monster1.id,
        hp: monster1.hp,
        isDefending: false,
        specialCooldown: 0,
      },
      player2: {
        id: player2Data.playerId,
        monsterId: monster2.id,
        hp: monster2.hp,
        isDefending: false,
        specialCooldown: 0,
      },
    }

    const [newBattle] = await battleRepository.create({
      arena_id: arenaId,
      player1_id: player1Data.playerId,
      monster1_id: monster1.id,
      player2_id: player2Data.playerId,
      monster2_id: monster2.id,
      current_turn_player_id: firstTurnPlayerId,
      status: 'ongoing',
      battle_state: initialState,
    })

    return newBattle
  },

  async performAction(battleId, actingPlayerId, actionType) {
    const battle = await battleRepository.findById(battleId)
    if (!battle) throw new Error('Batalha não encontrada.')
    if (battle.status === 'finished')
      throw new Error('Esta batalha já terminou.')

    const [monster1, monster2] = await Promise.all([
      monsterRepository.findById(battle.monster1_id),
      monsterRepository.findById(battle.monster2_id),
    ])

    if (
      actionType !== 'forfeit' &&
      battle.current_turn_player_id !== actingPlayerId
    ) {
      throw new Error('Não é o seu turno.')
    }

    const state = battle.battle_state
    let actingPlayer, opponent
    let actingMonster, opponentMonster

    if (actingPlayerId === state.player1.id) {
      actingPlayer = state.player1
      opponent = state.player2
      actingMonster = monster1
      opponentMonster = monster2
    } else {
      actingPlayer = state.player2
      opponent = state.player1
      actingMonster = monster2
      opponentMonster = monster1
    }

    let winnerId = null

    switch (actionType) {
      case 'attack':
        let damage = actingMonster.attack - opponentMonster.defense
        if (opponent.isDefending) {
          damage = Math.floor(damage / 2)
        }
        damage = Math.max(0, damage)
        opponent.hp -= damage
        break

      case 'defend':
        actingPlayer.isDefending = true
        break

      case 'special':
        if (actingPlayer.specialCooldown > 0) {
          throw new Error('Ataque especial está em recarga.')
        }
        opponent.hp -= actingMonster.special_attack_damage
        actingPlayer.specialCooldown = 3
        break

      case 'forfeit':
        winnerId = opponent.id
        battle.status = 'finished'
        battle.finished_at = new Date()
        break

      default:
        throw new Error('Ação inválida.')
    }

    if (actionType !== 'forfeit') {
      opponent.isDefending = false

      if (state.player1.specialCooldown > 0) state.player1.specialCooldown--
      if (state.player2.specialCooldown > 0) state.player2.specialCooldown--

      if (opponent.hp <= 0) {
        opponent.hp = 0
        winnerId = actingPlayer.id
        battle.status = 'finished'
        battle.finished_at = new Date()
      }

      battle.turn++
      battle.current_turn_player_id = opponent.id
    }

    const [updatedBattle] = await battleRepository.update(battle.id, {
      battle_state: state,
      current_turn_player_id: battle.current_turn_player_id,
      status: battle.status,
      winner_id: winnerId,
      finished_at: battle.finished_at,
    })

    return updatedBattle
  },
}

module.exports = BattleService
