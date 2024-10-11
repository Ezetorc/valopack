import { Role } from '../types/Role'

export default interface Card {
  image: string
  name: string
  role: Role
  uuid: string
  level: number
}
