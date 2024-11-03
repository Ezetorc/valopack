import { Hexadecimal } from '../../../../models/Hexadecimal'
import { GetParams } from './GetParams'

export interface ShowFadeParams {
  get: GetParams
  color: Hexadecimal | "current-team-color" | "opposite-team-color"
  duration: number
}
