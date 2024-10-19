import { useCallback, useContext } from 'react'
import { GameContext } from '../contexts/GameContext'
import Box from '../classes/Box'
import Player from '../classes/Player'
import Square from '../classes/Square'
import { BoxType } from '../types/BoxType'
import { Team } from '../types/Team'
import getDistance from '../utils/getDistance'
import Position from '../classes/Position'
import getDamage from '../utils/getDamage'
import GameContextType from '../interfaces/GameContextType'

export default function useBoard () {
  const context: GameContextType | undefined = useContext(GameContext)
  if (!context) throw new Error("Context doesn't have a provider!")

  const { board, setBoard, setSquareFrom, setSquareTo, setAction } = context

  const movePlayer = (player: Player, square: Square) => {
    setBoard(prevBoard => {
      const squareTo: Square = prevBoard.getSquare(square.position)
      const playerSquare: Square = prevBoard.getSquare(player.position)
      const movedPlayer: Player = new Player({
        ...player,
        position: new Position(square.position.x, square.position.y)
      })

      squareTo.add(movedPlayer)
      playerSquare.remove(player)

      return prevBoard
    })
  }

  const attackPlayer = (attacker: Player, target: Player) => {
    setBoard(prevBoard => {
      const damage: number = getDamage(attacker, target)
      target.setHealth(prevHealth => (prevHealth -= damage))

      if (target.isDead()) {
        const targetSquare: Square = prevBoard.getSquare(target.position)
        targetSquare.remove(target)
      }

      return prevBoard
    })
  }

  const killPlayer = (player: Player) => {
    setBoard(prevBoard => {
      const playerSquare: Square = prevBoard.getSquare(player.position)
      playerSquare.remove(player)
      return prevBoard
    })
  }

  const resetActions = useCallback(() => {
    setAction(null)
    setSquareFrom(null)
    setSquareTo(null)
  }, [setAction, setSquareFrom, setSquareTo])

  const getBoxesInRange = <T extends Box>(
    boxTypes: BoxType[] | 'all',
    position: Position,
    range: number,
    team: Team | 'any' = 'any'
  ) => {
    const boxesInRange: Box[] = []
    const { x, y } = position

    for (let i = -range; i <= range; i++) {
      for (let j = -range; j <= range; j++) {
        const neighborX: number = x + i
        const neighborY: number = y + j
        const neighborPosition: Position = new Position(neighborX, neighborY)
        const distance: number = getDistance(position, neighborPosition)

        if (
          distance <= range &&
          neighborY >= 0 &&
          neighborY < board.grid.length &&
          neighborX >= 0 &&
          neighborX < board.grid[0].length
        ) {
          const neighborSquare: Square = board.grid[neighborY][neighborX]
          for (const neighborBox of neighborSquare.boxes) {
            if (boxTypes === 'all' || boxTypes.includes(neighborBox.type)) {
              if (neighborBox.type === 'player' && team !== 'any') {
                const playerBox: Player = neighborBox as Player
                if (playerBox.team === team) {
                  boxesInRange.push(neighborBox as T)
                }
              } else {
                boxesInRange.push(neighborBox as T)
              }
            }
          }
        }
      }
    }

    return boxesInRange
  }

  return {
    ...context,
    getBoxesInRange,
    movePlayer,
    attackPlayer,
    killPlayer,
    resetActions
  }
}
