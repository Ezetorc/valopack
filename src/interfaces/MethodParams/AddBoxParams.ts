import { BoxType } from '../../types/BoxType'
import GetParams from './GetParams'

export default interface AddBoxParams {
  get: GetParams
  boxType: BoxType
}
