import { Vector2 } from '../types/Vector2'
import getDistance from './getDistance'

export default function isValidDistance (
  pos1: Vector2,
  pos2: Vector2,
  maxDistance: number
) {
  const distance = getDistance(pos1, pos2)
  return distance <= maxDistance
}
