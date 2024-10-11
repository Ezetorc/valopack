import { BoxType } from '../../types/BoxType'
import { GetBy } from '../../types/GetBy'
import { Team } from '../../types/Team'

export default interface GetParams {
  getBy: GetBy
  boxTypes?: BoxType[]
  range?: number
  team?: Team | 'any'
  tags?: string[]
}
