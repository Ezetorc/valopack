import { Role } from './Role'

export default interface Card {
  image: string
  name: string
  role: Role
  uuid: string
  level: number
}
