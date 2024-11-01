import {Position} from '../models/Position'
import {getDistance} from './getDistance'

export  function isValidDistance (
  pos1: Position,
  pos2: Position,
  maxDistance: number
) {
  const distance: number = getDistance(pos1, pos2)
  return distance <= maxDistance
}
