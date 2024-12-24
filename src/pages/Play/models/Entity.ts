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
  public image: string
  public onEntityEnter: (entity: Entity) => boolean

  constructor ({
    position = new Position(0, 0),
    free = true,
    tags = [],
    onEntityEnter = () => true,
    image = '',
    type
  }: Omit<Partial<Entity>, 'type'> & { type: EntityType }) {
    this.position = position
    this.free = free
    this.tags = tags
    this.type = type
    this.image = image
    this.onEntityEnter = onEntityEnter
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

  is (entityType: EntityType): boolean {
    return this.type == entityType
  }
}
