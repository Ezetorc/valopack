import { getShuffled } from '../../../utilities/getShuffled.ts'
import { boards } from '../constants/boards.ts'
import { Board } from '../models/Board.ts'

export function getRandomBoard (): Board {
  const boardsCopy: Board[] = [...Object.values(boards)]
  
  return getShuffled(boardsCopy)[0]
}
