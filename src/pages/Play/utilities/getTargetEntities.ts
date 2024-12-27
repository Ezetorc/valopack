import { EntityType } from '../models/EntityType'
import { Square } from '../models/Square'

export function getTargetEntities (
  targetSquare: Square
): 'empty' | EntityType[] {
  return targetSquare.isEmpty() ? 'empty' : targetSquare.getEntitiesTypes()
}
