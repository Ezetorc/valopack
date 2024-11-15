import { Role } from './Role.ts'
import { Ability } from '../pages/Play/models/Ability.ts'

export interface Agent {
  name: string
  id: number
  portrait: string
  icon: string
  role: Role
  level: number
  abilities: Ability[]
}
