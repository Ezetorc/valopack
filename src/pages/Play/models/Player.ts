import { Box } from './Box.ts'
import { TeamSide } from '../../../models/TeamSide.ts'
import { Attributes } from '../../../models/Attributes.ts'
import { Position } from './Position.ts'
import { initialAttributes } from '../../../valopack.config.ts'
import { Card } from '../../../models/Card.ts'

export class Player extends Box {
  public card: Card
  public attributes: Attributes
  public teamSide: TeamSide

  constructor ({
    card,
    teamSide = 'ally',
    attributes = { ...initialAttributes },
    position = new Position(0, 0),
    free = false,
    tags = [],
    type = 'player'
  }: Partial<Omit<Player, 'agent'>> & { card: Card }) {
    super({ position, free, tags, type })

    this.card = card
    this.attributes = attributes
    this.teamSide = teamSide
  }

  isDead (): boolean {
    return this.attributes.health <= 0
  }

  setHealth (callback: (prevHealth: number) => number): void {
    this.attributes.health = callback(this.attributes.health)
  }
}
