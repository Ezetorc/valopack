import Board from '../interfaces/Board'

export default function getBoardCopy (board: Board): Board {
  return structuredClone(board)
}
