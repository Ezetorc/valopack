import { EntityType } from '../EntityType.ts'
import { GetBy } from '../GetBy.ts'
import { TeamOption } from '../TeamOption.ts'
import {Tag} from '../Tag.ts'

export interface GetParams {
  getBy: GetBy
  range?: number
  tags?: Tag[]
  filters?: {
    entityTypes?: EntityType[]
    team?: TeamOption
    tags?: Tag[]
  }
}
