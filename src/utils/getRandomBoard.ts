import Board from '../classes/Board'
import { boards } from '../constants/boards'
import getRandomElements from './getRandomElements'

export default function getRandomBoard (): Board {
  console.log('randomboard')
  return getRandomElements(Object.values(boards))[0]
}
