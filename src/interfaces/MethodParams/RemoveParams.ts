import { BoxType } from '../../types/BoxType'
import GetParams from './GetParams'

export default interface RemoveParams {
  get: GetParams
  boxTypes: BoxType[]
}
