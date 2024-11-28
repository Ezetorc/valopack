import { TeamSide } from '../../../models/TeamSide'
import { Action } from './Action'
import { Board } from './Board'
import { Effect } from './Effect'
import { Square } from './Square'

type StateUpdater<T> = T | ((prev: T) => T)

export interface GameStore {
  board: Board
  setBoard: (newBoard: StateUpdater<Board>) => void

  squareFrom: Square | null
  setSquareFrom: (newSquareFrom: StateUpdater<Square | null>) => void

  squareTo: Square | null
  setSquareTo: (newSquareTo: StateUpdater<Square | null>) => void

  turn: TeamSide
  setTurn: (turn: StateUpdater<TeamSide>) => void

  action: Action | null
  setAction: (newAction: StateUpdater<Action | null>) => void

  effects: Effect[]
  setEffects: (newEffects: StateUpdater<Effect[]>) => void
}
