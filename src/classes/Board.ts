import { allyPositions, enemyPositions } from '../constants/general'
import Agent from '../interfaces/Agent'
import { BoardGrid } from '../types/BoardGrid'
import { Hexadecimal } from '../types/Hexadecimal'
import { Result } from '../types/Result'
import { Team } from '../types/Team'
import getDistance from '../utils/getDistance'
import Player from './Player'
import Position from './Position'
import Square from './Square'

export default class Board {
  public colors: [Hexadecimal, Hexadecimal]
  public grid: BoardGrid

  constructor (colors: [Hexadecimal, Hexadecimal], grid: BoardGrid) {
    this.colors = colors
    this.grid = grid
  }

  getSquare (position: Position): Square {
    return this.grid[position.y][position.x]
  }

  getTotalPlayers (): { allyPlayers: 0; enemyPlayers: 0 } {
    const grid = this.grid.flat()
    return grid.reduce(
      (accumulator, square) => {
        square.boxes.forEach(box => {
          if (box.type !== 'player') return
          const { team } = box as Player
          accumulator[`${team}Players`] += 1
        })
        return accumulator
      },
      { allyPlayers: 0, enemyPlayers: 0 }
    )
  }

  getResult (): Result {
    const { allyPlayers, enemyPlayers } = this.getTotalPlayers()

    if (allyPlayers === 0 && enemyPlayers > 0) {
      return 'enemy'
    } else if (enemyPlayers === 0 && allyPlayers > 0) {
      return 'ally'
    } else if (allyPlayers === 0 && enemyPlayers === 0) {
      return 'draw'
    }
  }

  getSquaresInRange (fromPosition: Position, range: number): Square[] {
    const squaresInRange: Square[] = []
    const { x, y } = fromPosition

    for (let i = -range; i <= range; i++) {
      for (let j = -range; j <= range; j++) {
        const neighborX: number = x + i
        const neighborY: number = y + j
        const neighborPosition: Position = new Position(neighborX, neighborY)
        const distance: number = getDistance(fromPosition, neighborPosition)

        if (
          distance <= range &&
          neighborY >= 0 &&
          neighborY < this.grid.length &&
          neighborX >= 0 &&
          neighborX < this.grid[0].length
        ) {
          const neighborSquare: Square = this.grid[neighborY][neighborX]
          squaresInRange.push(neighborSquare)
        }
      }
    }

    return squaresInRange
  }

  getInitialized (allyTeam: Agent[], enemyTeam: Agent[]): this {
    const placePlayers = (
      agents: Agent[],
      positions: Position[],
      team: Team
    ) => {
      positions.forEach((position, index) => {
        const agent: Agent = agents[index]
        const square: Square = this.getSquare(position)

        const newPlayer = new Player({
          agent: { ...agent },
          team: team,
          position: position
        })

        square.boxes.unshift(newPlayer)
      })
    }

    placePlayers(allyTeam, allyPositions, 'ally')
    placePlayers(enemyTeam, enemyPositions, 'enemy')

    return this
  }
}
