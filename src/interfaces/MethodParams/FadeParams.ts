import { Hexadecimal } from '../../types/Hexadecimal'
import GetParams from './GetParams'

export default interface FadeParams {
  get: GetParams
  color: Hexadecimal | "currentTeamColor" | "oppositeTeamColor"
  duration: number
}
