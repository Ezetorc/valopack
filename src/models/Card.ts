import { Ability } from '../pages/Play/models/Ability.ts'
import { Role } from './Role.ts'

export interface Card {
  image: string
  icon: string
  name: string
  role: Role
  level: number
  abilities: Ability[]
  isInTeam: boolean
}
