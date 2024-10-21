import Player from '../classes/Player'
import Square from '../classes/Square'
import GetParams from '../interfaces/MethodParams/GetParams'

export default function applyFilters (
  squares: Square[],
  filters: GetParams['filters']
): void {
  if (!filters) return
  for (let i = squares.length - 1; i >= 0; i--) {
    const square = squares[i]
    const player: Player = square.get('player') as Player

    if (filters.boxTypes) {
      const hasAllBoxTypes = filters.boxTypes.every(boxType =>
        square.boxes.some(box => box.type === boxType)
      )

      if (!hasAllBoxTypes) {
        squares.splice(i, 1)
        continue
      }
    }

    if (filters.team && player) {
      if (player.team !== filters.team) {
        squares.splice(i, 1)
        continue
      }
    }

    if (filters.tags) {
      const hasTags: boolean = square.boxes.some(box =>
        box.has(filters.tags as string[])
      )

      if (!hasTags) {
        squares.splice(i, 1)
        continue
      }
    }
  }
}
