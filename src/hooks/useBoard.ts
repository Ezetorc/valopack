import { useCallback, useContext } from 'react'
import { GameContext } from '../contexts/GameContext'
import Box from '../classes/Box'
import Player from '../classes/Player'
import Square from '../classes/Square'
import { BoxType } from '../types/BoxType'
import { Team } from '../types/Team'
import { Vector2 } from '../types/Vector2'
import getBoardCopy from '../utils/getBoardCopy'
import getDistance from '../utils/getDistance'
import { Result } from '../types/Result'

export default function useBoard () {
  const context = useContext(GameContext)
  if (!context) throw new Error("Context doesn't have a provider!")

  const { board, setBoard, setSquareFrom, setSquareTo, setAction } = context

  const getTotalPlayers = useCallback(() => {
    return board.grid.flat().reduce(
      (acc, square) => {
        square.boxes.forEach(box => {
          if (box.type === 'player') {
            const { team } = box as Player
            if (team === 'ally') acc.allyPlayers++
            else acc.enemyPlayers++
          }
        })
        return acc
      },
      { allyPlayers: 0, enemyPlayers: 0 }
    )
  }, [board.grid])

  const movePlayer = (player: Player, squareTo: Square) => {
    const newBoard = getBoardCopy(board)
    const squarePosition = { ...squareTo.position }
    const playerPosition = player.position
    const playerSquare = newBoard.grid[playerPosition.y][playerPosition.x]

    squareTo.boxes.unshift({ ...player, position: squarePosition })
    playerSquare.boxes = playerSquare.boxes.filter(box => box !== player)

    setBoard(newBoard)
  }

  const attackPlayer = (attacker: Player, target: Player) => {
    const damage = Math.max(
      attacker.attributes.attack - target.attributes.defense,
      0
    )

    target.attributes.health -= damage

    if (target.attributes.health <= 0) {
      killPlayer(target)
    }
  }

  const killPlayer = (player: Player) => {
    const newBoard = getBoardCopy(board)
    const agentPosition = { ...player.position }
    const square = newBoard.grid[agentPosition.y][agentPosition.x]

    square.boxes = square.boxes.filter(box => box !== player)
    setBoard(newBoard)
  }

  const isInAttackRange = (pos1: Vector2, pos2: Vector2) => {
    return getDistance(pos1, pos2) === 1
  }

  const chooseWinner = (
    setWinner: React.Dispatch<React.SetStateAction<Result>>
  ) => {
    const { allyPlayers, enemyPlayers } = getTotalPlayers()

    if (allyPlayers === 0 && enemyPlayers > 0) {
      setWinner('enemy')
    } else if (enemyPlayers === 0 && allyPlayers > 0) {
      setWinner('ally')
    } else if (allyPlayers === 0 && enemyPlayers === 0) {
      setWinner('draw')
    }
  }

  const resetActions = useCallback(() => {
    setAction(null)
    setSquareFrom(null)
    setSquareTo(null)
  }, [setAction, setSquareFrom, setSquareTo])

  const getInRange = <T extends Box>(
    boxTypes: BoxType[] | 'all',
    position: Vector2,
    range: number,
    team: Team | 'any' = 'any'
  ) => {
    const boxesInRange: Box[] = []
    const { x, y } = position

    for (let i = -range; i <= range; i++) {
      for (let j = -range; j <= range; j++) {
        const neighborX: number = x + i
        const neighborY: number = y + j
        const neighborPosition: Vector2 = { x: neighborX, y: neighborY }
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
    getInRange,
    movePlayer,
    attackPlayer,
    killPlayer,
    getTotalPlayers,
    isInAttackRange,
    resetActions,
    chooseWinner
  }
}
