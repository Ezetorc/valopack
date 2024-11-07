import { BoxType } from '../BoxType.ts'
import { GetParams } from './GetParams.ts'

export interface RemoveBoxParams {
  get: GetParams
  boxTypes: BoxType[]
}
