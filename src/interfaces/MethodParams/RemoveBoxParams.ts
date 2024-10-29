import { BoxType } from '../../types/BoxType'
import GetParams from './GetParams'

export default interface RemoveBoxParams {
  get: GetParams
  boxTypes: BoxType[]
}
