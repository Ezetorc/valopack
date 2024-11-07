import { BoxType } from '../BoxType.ts'
import { GetParams } from './GetParams.ts'

export interface AddBoxParams {
  get: GetParams
  boxType: BoxType
}
