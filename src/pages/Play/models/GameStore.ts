import { TeamSide } from '../../../models/TeamSide'
import { Action } from './Action'
import { Board } from './Board'
import { Effect } from './Effect'
import { Square } from './Square'

export interface GameStore {
  board: Board
  setBoard: (newBoard: Board) => void

  squareFrom: Square | null
  setSquareFrom: (newSquareFrom: Square | null) => void

  squareTo: Square | null
  setSquareTo: (newSquareTo: Square | null) => void

  turn: TeamSide
  setTurn: (newTurn: TeamSide) => void

  action: Action | null
  setAction: (newAction: Action | null) => void

  effects: Effect[]
  setEffects: (newEffects: Effect[]) => void
}
