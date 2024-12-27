import { EntityType } from '../models/EntityType'
import { getMissingEntityTypes } from './getMissingEntityTypes'

export function getMissingEntities (
  validEntityTypes: (EntityType | 'empty')[] | 'all'
): EntityType[] {
  return validEntityTypes !== 'all'
    ? getMissingEntityTypes(
        validEntityTypes.filter(type => type !== 'empty') as EntityType[]
      )
    : []
}
