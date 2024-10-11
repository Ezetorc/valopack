import Board from '../interfaces/Board'

export default function getBoardCopy (board: Board): Board {
  return { ...board, grid: [...board.grid] }
}
