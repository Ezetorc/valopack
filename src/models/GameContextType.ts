import { Board } from '../pages/Play/models/Board.ts'
import { Square } from '../pages/Play/models/Square.ts'
import { Action } from '../pages/Play/models/Action.ts'
import { Team } from './Team.ts'
import { Effect } from '../pages/Play/models/Effect.ts'

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
