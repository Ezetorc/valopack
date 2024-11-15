import { Role } from './Role.ts'

export interface Card {
  image: string
  name: string
  role: Role
  level: number
}
