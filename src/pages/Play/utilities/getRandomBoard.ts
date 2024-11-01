import {Board} from '../models/Board'
import { boards } from '../constants/boards'
import {getRandomElements} from '../../../utilities/getRandomElements'

export function getRandomBoard (): Board {
  return getRandomElements(Object.values(boards))[0]
}
