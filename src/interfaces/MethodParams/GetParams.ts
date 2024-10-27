import { BoxType } from '../../types/BoxType'
import { GetBy } from '../../types/GetBy'
import { TeamOption } from '../../types/TeamOption'
import Tag from '../Tag'

export default interface GetParams {
  getBy: GetBy
  range?: number
  tags?: Tag[]
  filters?: {
    boxTypes?: BoxType[]
    team?: TeamOption
    tags?: Tag[]
  }
}
