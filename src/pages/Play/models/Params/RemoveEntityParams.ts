import { EntityType } from '../EntityType.ts'
import { GetParams } from './GetParams.ts'

export interface RemoveEntityParams {
  get: GetParams
  entityTypes: EntityType[]
}
