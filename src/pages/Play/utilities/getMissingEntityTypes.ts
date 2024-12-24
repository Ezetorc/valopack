import { EntityType } from '../models/EntityType'

export function getMissingEntityTypes (entityType: EntityType[]): EntityType[] {
  return entityType.filter(type => !entityType.includes(type))
}
