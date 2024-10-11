import Square from '../classes/Square'
import Board from '../interfaces/Board'

export default function getSquareColor (square: Square, board: Board): string {
  const { x, y } = square.position
  const isEven: boolean = (x + y) % 2 === 0
  const squareColor: string = isEven ? board.color[0] : board.color[1]

  return squareColor
}
