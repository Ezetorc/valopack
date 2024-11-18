import { Tag } from './Tag.ts'
import { EntityType } from './EntityType.ts'
import { Player } from './Player.ts'
import { Position } from './Position.ts'
import { Square } from './Square.ts'

export class Entity {
  public free: boolean
  public tags: Tag[]
  public type: EntityType
  public position: Position

  constructor ({
    position = new Position(0, 0),
    free = true,
    tags = [],
    type
  }: Omit<Partial<Entity>, 'type'> & { type: EntityType }) {
    this.position = position
    this.free = free
    this.tags = tags
    this.type = type
  }

  has (tags: Tag[]): boolean {
    return tags.every(tag => this.tags.includes(tag))
  }

  getOpacity (square: Square): number {
    const smokeInSquare: boolean = square.entities.some(
      entity => entity.type == 'skySmoke'
    )

    if (smokeInSquare && this.type == 'player' && this instanceof Player) {
      const playerTeamSide = this.teamSide

      if (playerTeamSide == 'ally') {
        return 0.4
      }
    }

    return 1
  }
}
