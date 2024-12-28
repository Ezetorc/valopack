import { Role } from './Role.ts'
import { Ability } from './Ability.ts'

export interface Agent {
  name: string
  id: number
  portrait: string
  icon: string
  role: Role
  abilities: Ability[]
}
