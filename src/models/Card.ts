import { Ability } from './Ability.ts'
import { Role } from './Role.ts'

export interface Card {
  image: string
  portrait: string
  name: string
  role: Role
  level: number
  abilities: Ability[]
  isInTeam: boolean
}
