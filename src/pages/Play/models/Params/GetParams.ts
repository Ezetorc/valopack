import { BoxType } from '../BoxType'
import { GetBy } from '../GetBy'
import { TeamOption } from '../TeamOption'
import {Tag} from '../Tag'

export interface GetParams {
  getBy: GetBy
  range?: number
  tags?: Tag[]
  filters?: {
    boxTypes?: BoxType[]
    team?: TeamOption
    tags?: Tag[]
  }
}
