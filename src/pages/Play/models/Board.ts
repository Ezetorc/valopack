import { Tag } from './Tag.ts'
import { BoardGrid } from './BoardGrid.ts'
import { Hexadecimal } from '../../../models/Hexadecimal.ts'
import { Result } from './Result.ts'
import { TeamSide } from '../../../models/TeamSide.ts'
import { Player } from './Player.ts'
import { Position } from './Position.ts'
import { Square } from './Square.ts'
import { allyPositions, enemyPositions } from '../constants/positions.ts'
import { Distance } from '../services/Distance.service.ts'
import { Card } from '../../../models/Card.ts'

export class Board {
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
        square.entities.forEach(entity => {
          if (entity.type !== 'player') return
          const { teamSide } = entity as Player
          accumulator[`${teamSide}Players`] += 1
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
        const distance: number = Distance.get(fromPosition, neighborPosition)

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

  getInitialized (allyTeam: Card[], enemyTeam: Card[]): this {
    const placePlayers = (
      team: Card[],
      positions: Position[],
      teamSide: TeamSide
    ) => {
      positions.forEach((position, index) => {
        const card: Card = team[index]
        if (!card) return
        const square: Square = this.getSquare(position)
        const newPlayer: Player = new Player({
          ...card,
          teamSide: teamSide,
          position: position
        })

        square.entities.unshift(newPlayer)
      })
    }

    placePlayers(allyTeam, allyPositions, 'ally')
    placePlayers(enemyTeam, enemyPositions, 'enemy')

    return this
  }

  getByTags (tags: Tag[]): Square[] {
    return this.grid.flat().filter(square => {
      return square.entities.some(entity => {
        return tags.every(tag =>
          entity.tags.some(entityTag => entityTag.text === tag.text)
        )
      })
    })
  }
}
