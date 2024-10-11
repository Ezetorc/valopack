import Square from '../classes/Square'
import { Action } from '../types/Action'
import { Team } from '../types/Team'
import Board from './Board'
import Effect from './Effect'

export default interface GameContextType {
  board: Board
  setBoard: React.Dispatch<React.SetStateAction<Board>>
  squareFrom: Square | null
  setSquareFrom: React.Dispatch<React.SetStateAction<Square | null>>
  squareTo: Square | null
  setSquareTo: React.Dispatch<React.SetStateAction<Square | null>>
  turn: Team
  setTurn: React.Dispatch<React.SetStateAction<Team>>
  action: Action | null
  setAction: React.Dispatch<React.SetStateAction<Action | null>>
  effects: Effect[]
  setEffects: React.Dispatch<React.SetStateAction<Effect[]>>
}
