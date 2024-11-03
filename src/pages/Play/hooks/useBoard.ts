import { useCallback, useContext } from 'react'
import { Player } from '../models/Player'
import { Square } from '../models/Square'
import { Position } from '../models/Position'
import { getDamage } from '../utilities/getDamage'
import GameContextType from '../../../models/GameContextType'
import { GameContext } from '../contexts/GameContext'

export function useBoard () {
  const context: GameContextType | undefined = useContext(GameContext)
  if (!context) throw new Error("Context doesn't have a provider!")

  const { setBoard, setSquareFrom, setSquareTo, setAction, setTurn } = context

  const toggleTurn = (): void => {
    setTurn(prevTurn => {
      return prevTurn === 'ally' ? 'enemy' : 'ally'
    })
  }

  const movePlayer = (player: Player, square: Square) => {
    setBoard(prevBoard => {
      const squareTo: Square = prevBoard.getSquare(square.position)
      const playerSquare: Square = prevBoard.getSquare(player.position)
      const movedPlayer: Player = new Player({
        ...player,
        position: new Position(square.position.x, square.position.y)
      })

      squareTo.addBox(movedPlayer)
      playerSquare.removeBox(player)

      return prevBoard
    })
  }

  const attackPlayer = (attacker: Player, target: Player) => {
    setBoard(prevBoard => {
      const damage: number = getDamage(attacker, target)
      target.setHealth(prevHealth => (prevHealth -= damage))

      if (target.isDead()) {
        const targetSquare: Square = prevBoard.getSquare(target.position)
        targetSquare.removeBox(target)
      }

      return prevBoard
    })
  }

  const killPlayer = (player: Player) => {
    setBoard(prevBoard => {
      const playerSquare: Square = prevBoard.getSquare(player.position)
      playerSquare.removeBox(player)
      return prevBoard
    })
  }

  const resetActions = useCallback(() => {
    setAction(null)
    setSquareFrom(null)
    setSquareTo(null)
  }, [setAction, setSquareFrom, setSquareTo])

  return {
    ...context,
    movePlayer,
    attackPlayer,
    killPlayer,
    resetActions,
    toggleTurn
  }
}
