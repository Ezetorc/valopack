import { entityTypes } from '../constants/entityTypes'
import { EntityType } from '../models/EntityType'

export function getMissingEntityTypes (entityType: EntityType[]): EntityType[] {
  return entityTypes.filter(type => !entityType.includes(type))
}
