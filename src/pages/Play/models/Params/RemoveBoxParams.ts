import { BoxType } from '../BoxType'
import { GetParams } from './GetParams'

export interface RemoveBoxParams {
  get: GetParams
  boxTypes: BoxType[]
}
