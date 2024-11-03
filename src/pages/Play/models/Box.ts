import { Tag } from './Tag'
import { BoxType } from './BoxType'
import { Team } from '../../../models/Team'
import { Player } from './Player'
import { Position } from './Position'
import { Square } from './Square'

export class Box {
  public free: boolean
  public tags: Tag[]
  public type: BoxType
  public position: Position

  constructor ({
    position = new Position(0, 0),
    free = true,
    tags = [],
    type = 'box'
  }: Partial<Box> = {}) {
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
