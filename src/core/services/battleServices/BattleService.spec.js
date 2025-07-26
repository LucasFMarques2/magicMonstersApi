const BattleService = require('./battleService')
const battleRepository = require('../../repositories/battleRepository')
const monsterRepository = require('../../repositories/monsterRepository')

jest.mock('../../repositories/battleRepository')
jest.mock('../../repositories/monsterRepository')


describe('BattleService: performAction', () => {
  beforeEach(() => {
    battleRepository.findById.mockClear()
    battleRepository.update.mockClear()
    monsterRepository.findById.mockClear()
  })

  it('deve calcular o dano correto em um ataque simples', async () => {
    const fakeMonster1 = { id: 1, attack: 20, defense: 10 }
    const fakeMonster2 = { id: 2, defense: 5 }
    const fakeBattle = {
      id: 1,
      status: 'ongoing',
      current_turn_player_id: 101,
      monster1_id: 1,
      monster2_id: 2,
      battle_state: {
        turn: 1,
        player1: { id: 101, hp: 100 },
        player2: { id: 102, hp: 100, isDefending: false },
      },
    }

    battleRepository.findById.mockResolvedValue(fakeBattle)
    monsterRepository.findById.mockImplementation(id =>
      id === 1 ? fakeMonster1 : fakeMonster2
    )
    battleRepository.update.mockImplementation((id, data) =>
      Promise.resolve([data])
    )
    const result = await BattleService.performAction(1, 101, 'attack')

    expect(result.battle_state.player2.hp).toBe(85)
    expect(result.current_turn_player_id).toBe(102)
  })

  it('deve reduzir o dano pela metade se o oponente estiver defendendo', async () => {
    const fakeMonster1 = { id: 1, attack: 30 }
    const fakeMonster2 = { id: 2, defense: 10 }
    const fakeBattle = {
      id: 1,
      status: 'ongoing',
      current_turn_player_id: 101,
      monster1_id: 1,
      monster2_id: 2,
      battle_state: {
        turn: 2,
        player1: { id: 101, hp: 100 },
        player2: { id: 102, hp: 100, isDefending: true },
      },
    }

    battleRepository.findById.mockResolvedValue(fakeBattle)
    monsterRepository.findById.mockImplementation(id =>
      id === 1 ? fakeMonster1 : fakeMonster2
    )
    battleRepository.update.mockImplementation((id, data) =>
      Promise.resolve([data])
    )

    const result = await BattleService.performAction(1, 101, 'attack')

    expect(result.battle_state.player2.hp).toBe(90)
    expect(result.battle_state.player2.isDefending).toBe(false)
  })

  it('deve declarar um vencedor quando o HP do oponente chegar a zero', async () => {
    const fakeMonster1 = { id: 1, attack: 20 }
    const fakeMonster2 = { id: 2, defense: 5 }
    const fakeBattle = {
      id: 1,
      status: 'ongoing',
      current_turn_player_id: 101,
      monster1_id: 1,
      monster2_id: 2,
      battle_state: {
        turn: 5,
        player1: { id: 101, hp: 100 },
        player2: { id: 102, hp: 10 },
      },
    }

    battleRepository.findById.mockResolvedValue(fakeBattle)
    monsterRepository.findById.mockImplementation(id =>
      id === 1 ? fakeMonster1 : fakeMonster2
    )
    battleRepository.update.mockImplementation((id, data) =>
      Promise.resolve([data])
    )

    const result = await BattleService.performAction(1, 101, 'attack')

    expect(result.battle_state.player2.hp).toBe(0)
    expect(result.status).toBe('finished')
    expect(result.winner_id).toBe(101)
  })

  it('deve declarar o oponente como vencedor em caso de desistência', async () => {
    const fakeBattle = {
      id: 1,
      status: 'ongoing',
      current_turn_player_id: 101,
      battle_state: {
        player1: { id: 101 },
        player2: { id: 102 },
      },
    }

    battleRepository.findById.mockResolvedValue(fakeBattle)
    monsterRepository.findById.mockResolvedValue({})
    battleRepository.update.mockImplementation((id, data) =>
      Promise.resolve([data])
    )

    const result = await BattleService.performAction(1, 101, 'forfeit')

    expect(result.status).toBe('finished')
    expect(result.winner_id).toBe(102) 
  })
})
