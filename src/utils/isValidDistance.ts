import Position from '../classes/Position'
import getDistance from './getDistance'

export default function isValidDistance (
  pos1: Position,
  pos2: Position,
  maxDistance: number
) {
  const distance = getDistance(pos1, pos2)
  return distance <= maxDistance
}
