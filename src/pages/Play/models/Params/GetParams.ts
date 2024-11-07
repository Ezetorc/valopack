import { BoxType } from '../BoxType.ts'
import { GetBy } from '../GetBy.ts'
import { TeamOption } from '../TeamOption.ts'
import {Tag} from '../Tag.ts'

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
