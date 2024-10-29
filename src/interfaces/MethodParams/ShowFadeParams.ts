import { Hexadecimal } from '../../types/Hexadecimal'
import GetParams from './GetParams'

export default interface ShowFadeParams {
  get: GetParams
  color: Hexadecimal | "current-team-color" | "opposite-team-color"
  duration: number
}
