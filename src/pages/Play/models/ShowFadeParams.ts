import { Hexadecimal } from '../../../models/Hexadecimal.ts'
import { GetParams } from './GetParams.ts'

export interface ShowFadeParams {
  get: GetParams
  color: Hexadecimal | "current-team-color" | "opposite-team-color"
  duration: number
}
