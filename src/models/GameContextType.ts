import { Board } from '../pages/Play/models/Board'
import { Square } from '../pages/Play/models/Square'
import { Action } from '../pages/Play/models/Action'
import { Team } from './Team'
import { Effect } from '../pages/Play/models/Effect'

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
