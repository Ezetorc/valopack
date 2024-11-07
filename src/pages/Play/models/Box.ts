import { Tag } from './Tag.ts'
import { BoxType } from './BoxType.ts'
import { Team } from '../../../models/Team.ts'
import { Player } from './Player.ts'
import { Position } from './Position.ts'
import { Square } from './Square.ts'

export class Box {
  public free: boolean
  public tags: Tag[]
  public type: BoxType
  public position: Position

  constructor ({
    position = new Position(0, 0),
    free = true,
    tags = [],
    type
  }: Omit<Partial<Box>, 'type'> & { type: BoxType }) {
    this.position = position
    this.free = free
    this.tags = tags
    this.type = type
  }

  has (tags: Tag[]): boolean {
    return tags.every(tag => this.tags.includes(tag))
  }

  getOpacity (square: Square): number {
    const smokeInSquare: boolean = square.boxes.some(
      box => box.type == 'skySmoke'
    )

    if (smokeInSquare && this.type == 'player' && this instanceof Player) {
      const playerTeam: Team = this.team

      if (playerTeam == 'ally') {
        return 0.4
      }
    }

    return 1
  }
}
