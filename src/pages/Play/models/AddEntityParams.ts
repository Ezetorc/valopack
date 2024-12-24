import { EntityType } from './EntityType.ts'
import { GetParams } from './GetParams.ts'

export interface AddEntityParams {
  get: GetParams
  entityType: EntityType
  position?: 'backward' | 'forward'
}
