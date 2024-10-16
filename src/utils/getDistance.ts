import Position from '../classes/Position'

export default function getDistance (
  positionA: Position,
  positionB: Position
): number {
  return Math.floor(
    Math.max(
      Math.abs(positionB.x - positionA.x),
      Math.abs(positionB.y - positionA.y)
    )
  )
}
