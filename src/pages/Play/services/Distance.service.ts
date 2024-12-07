import { Position } from '../models/Position.ts'

export class Distance {
  static get (positionA: Position, positionB: Position): number {
    return Math.floor(
      Math.max(
        Math.abs(positionB.x - positionA.x),
        Math.abs(positionB.y - positionA.y)
      )
    )
  }

  static isValid (pos1: Position, pos2: Position, maxDistance: number): boolean {
    const distance: number = this.get(pos1, pos2)

    return distance <= maxDistance
  }

  static isWithinRange (distance: number, range: [number, number]): boolean {
    const [min, max] = range

    return distance >= min && distance <= max
  }
}
