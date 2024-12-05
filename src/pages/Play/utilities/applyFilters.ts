import { TeamSide } from '../../../models/TeamSide'
import { GetParams } from '../models/GetParams'
import { Player } from '../models/Player'
import { Square } from '../models/Square'
import { Tag } from '../models/Tag'
import { Parser } from '../services/Parser.service'

export function applyFilters (
  squares: Square[],
  filters: GetParams['filters'],
  turn: TeamSide
): void {
  if (!filters) return

  for (let i = squares.length - 1; i >= 0; i--) {
    const square: Square = squares[i]
    const player: Player = square.getEntityByType('player') as Player

    if (filters.entityTypes) {
      const hasAllEntityTypes: boolean = filters.entityTypes.every(entityType =>
        square.entities.some(entity => entity.type === entityType)
      )

      if (!hasAllEntityTypes) {
        squares.splice(i, 1)
        continue
      }
    }

    if (filters.teamSide && player) {
      const parsedTeamSide: TeamSide = Parser.getTeamSide(
        filters.teamSide,
        turn
      )

      if (player.teamSide !== parsedTeamSide) {
        squares.splice(i, 1)
        continue
      }
    }

    if (filters.tags) {
      const hasTags: boolean = square.entities.some(entity =>
        entity.has(filters.tags as Tag[])
      )

      if (!hasTags) {
        squares.splice(i, 1)
        continue
      }
    }
  }
}
