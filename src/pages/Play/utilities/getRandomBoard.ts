import { shuffle } from 'lodash'
import { boards } from '../constants/boards.ts'
import { Board } from '../models/Board.ts'

export function getRandomBoard (): Board {
  const boardsCopy: Board[] = [...Object.values(boards)]
  return shuffle(boardsCopy)[0]
}
