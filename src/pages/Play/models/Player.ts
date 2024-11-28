import { Entity } from './Entity.ts'
import { TeamSide } from '../../../models/TeamSide.ts'
import { Attributes } from '../../../models/Attributes.ts'
import { Position } from './Position.ts'
import { initialAttributes } from '../../../valopack.config.ts'
import { Role } from '../../../models/Role.ts'
import { Ability } from './Ability.ts'
import { Parser } from '../services/Parser.service.ts'

export class Player extends Entity {
  public name: string
  public image: string
  public icon: string
  public role: Role
  public level: number
  public abilities: Ability[]
  public isInTeam: boolean
  public attributes: Attributes
  public teamSide: TeamSide
  public abilityUses: [number, number]

  constructor ({
    name = 'Unknown',
    image = '',
    icon = '',
    role = 'duelist',
    level = 1,
    abilities = [],
    isInTeam = false,
    teamSide = 'ally',
    attributes = { ...initialAttributes },
    position = new Position(0, 0),
    free = false,
    tags = [],
    type = 'player'
  }: Partial<Player>) {
    super({ position, free, tags, type })

    const parsedAbilities: Ability[] = Parser.getParsedAbilities(abilities)
    const parsedAttributes: Attributes = Parser.getParsedAttributes(
      attributes,
      level
    )

    this.name = name
    this.image = image
    this.icon = icon
    this.role = role
    this.level = level
    this.abilities = parsedAbilities
    this.isInTeam = isInTeam
    this.attributes = parsedAttributes
    this.teamSide = teamSide
    this.abilityUses = [
      parsedAbilities[0]?.uses ?? 1,
      parsedAbilities[1]?.uses ?? 1
    ]
  }

  isDead (): boolean {
    return this.attributes.health <= 0
  }

  setHealth (callback: (prevHealth: number) => number): void {
    this.attributes.health = callback(this.attributes.health)
  }
}
