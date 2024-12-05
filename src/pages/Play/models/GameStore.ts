import { TeamSide } from '../../../models/TeamSide'
import { Action } from './Action'
import { Board } from './Board'
import { PendingAction } from './PendingAction'
import { Square } from './Square'

export interface GameStore {
  board: Board
  getBoard: () => Board
  setBoard: (newBoard: Board) => void

  squareFrom: Square | null
  getSquareFrom: () => Square | null
  setSquareFrom: (newSquareFrom: Square | null) => void

  squareTo: Square | null
  getSquareTo: () => Square | null
  setSquareTo: (newSquareTo: Square | null) => void

  turn: TeamSide
  getTurn: () => TeamSide
  setTurn: (newTurn: TeamSide) => void

  action: Action | null
  getAction: () => Action | null
  setAction: (newAction: Action | null) => void

  pendingActions: PendingAction[]
  getPendingActions: () => PendingAction[]
  setPendingActions: (newPendingActions: PendingAction[]) => void
}
