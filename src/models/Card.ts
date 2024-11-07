import { Role } from './Role.ts'

export default interface Card {
  image: string
  name: string
  role: Role
  uuid: string
  level: number
}
