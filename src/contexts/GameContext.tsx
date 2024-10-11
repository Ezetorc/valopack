import { createContext, ReactNode, useState } from 'react'
import { Team } from '../types/Team'
import { Action } from '../types/Action'
import Effect from '../interfaces/Effect'
import GameContextType from '../interfaces/GameContextType'
import Square from '../classes/Square'
import { boards } from '../constants/boards'
import Board from '../interfaces/Board'

export const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameContextProvider ({ children }: { children: ReactNode }) {
  const [turn, setTurn] = useState<Team>('ally')
  const [squareFrom, setSquareFrom] = useState<Square | null>(null)
  const [squareTo, setSquareTo] = useState<Square | null>(null)
  const [action, setAction] = useState<Action | null>(null)
  const [board, setBoard] = useState<Board>(boards.bind)
  const [effects, setEffects] = useState<Effect[]>([])

  return (
    <GameContext.Provider
      value={{
        board,
        setBoard,
        squareFrom,
        setSquareFrom,
        turn,
        setTurn,
        action,
        setAction,
        squareTo,
        setSquareTo,
        effects,
        setEffects
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
