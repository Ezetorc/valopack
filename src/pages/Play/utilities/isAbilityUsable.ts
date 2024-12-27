import { EntityType } from '../models/EntityType'
import { Distance } from '../services/Distance.service'

export function isAbilityUsable (
  distance: number,
  range: [number, number],
  validEntityTypes: (EntityType | 'empty')[] | 'all',
  targetEntities: 'empty' | EntityType[],
  missingEntityTypes: EntityType[]
): boolean {
  if (!Distance.isWithinRange(distance, range)) return false

  if (validEntityTypes === 'all') return true

  if (targetEntities === 'empty') {
    return validEntityTypes.includes('empty')
  }

  return targetEntities.every(
    entityType =>
      validEntityTypes.includes(entityType) &&
      !missingEntityTypes.includes(entityType)
  )
}
