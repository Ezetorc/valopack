import { TeamSide } from './../../../models/TeamSide';
import { useCallback } from 'react'
import { Player } from '../models/Player.ts'
import { Square } from '../models/Square.ts'
import { Position } from '../models/Position.ts'
import { getDamage } from '../utilities/getDamage.ts'
import { GameStore } from '../models/GameStore.ts'
import { getGameStore } from '../stores/getGameStore.ts'

export function useBoard () {
  const gameStore: GameStore = getGameStore()
  const { setSquareFrom, setSquareTo, setAction, setTurn, turn, board } =
    gameStore

  const toggleTurn = (): void => {
    const newTurn: TeamSide = turn === 'ally' ? 'enemy' : 'ally'
    setTurn(newTurn)
  }

  const movePlayer = (player: Player, square: Square) => {
    const squareTo: Square = board.getSquare(square.position)
    const playerSquare: Square = board.getSquare(player.position)
    const movedPlayer: Player = new Player({
      ...player,
      position: new Position(square.position.x, square.position.y)
    })

    squareTo.addBox(movedPlayer)
    playerSquare.removeBox(player)
  }

  const attackPlayer = (attacker: Player, target: Player) => {
    const damage: number = getDamage(attacker, target)
    target.setHealth(prevHealth => (prevHealth -= damage))

    if (target.isDead()) {
      const targetSquare: Square = board.getSquare(target.position)
      targetSquare.removeBox(target)
    }
  }

  const killPlayer = (player: Player) => {
    const playerSquare: Square = board.getSquare(player.position)
    playerSquare.removeBox(player)
  }

  const resetActions = useCallback(() => {
    setAction(null)
    setSquareFrom(null)
    setSquareTo(null)
  }, [setAction, setSquareFrom, setSquareTo])

  return {
    ...gameStore,
    movePlayer,
    attackPlayer,
    killPlayer,
    resetActions,
    toggleTurn
  }
}
