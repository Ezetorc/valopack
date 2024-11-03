import { Agent } from '../../../models/Agent'
import { Box } from './Box'
import { Team } from '../../../models/Team'
import { Attributes } from '../../../models/Attributes'
import { Position } from './Position'
import { initialAttributes } from '../../../valopack.config'

export class Player extends Box {
  public agent: Agent
  public attributes: Attributes
  public team: Team

  constructor ({
    agent,
    team = 'ally',
    attributes = { ...initialAttributes },
    position = new Position(0, 0),
    free = false,
    tags = [],
    type = 'player'
  }: Partial<Omit<Player, 'agent'>> & { agent: Agent }) {
    super({ position, free, tags, type })

    this.agent = agent
    this.attributes = attributes
    this.team = team
  }

  isDead (): boolean {
    return this.attributes.health <= 0
  }

  setHealth (callback: (prevHealth: number) => number): void {
    this.attributes.health = callback(this.attributes.health)
  }
}