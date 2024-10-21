import { BoxType } from '../../types/BoxType'
import { GetBy } from '../../types/GetBy'
import { Team } from '../../types/Team'

export default interface GetParams {
  getBy: GetBy
  range?: number
  filters?: {
    boxTypes?: BoxType[]
    team?: Team
    tags?: string[]
  }
}
