import { allyPositions, enemyPositions } from '../constants/general'
import Agent from '../interfaces/Agent'
import { BoardGrid } from '../types/BoardGrid'
import { Hexadecimal } from '../types/Hexadecimal'
import { Result } from '../types/Result'
import { Team } from '../types/Team'
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
