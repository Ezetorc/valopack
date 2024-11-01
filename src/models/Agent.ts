import { Role } from './Role'
import {Ability} from '../pages/Play/models/Ability'

export interface Agent {
  name: string
  id: number
  portrait: string
  icon: string
  level: number
  role: Role
  abilities: Ability[]
}
