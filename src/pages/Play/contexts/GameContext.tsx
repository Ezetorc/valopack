import { createContext, ReactNode, useState } from 'react'
import GameContextType from '../../../models/GameContextType'
import { Team } from '../../../models/Team'
import { Action } from '../models/Action'
import { Board } from '../models/Board'
import { Effect } from '../models/Effect'
import { Square } from '../models/Square'
import { getRandomBoard } from '../utilities/getRandomBoard'

export const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameContextProvider ({ children }: { children: ReactNode }) {
  const [squareFrom, setSquareFrom] = useState<Square | null>(null)
  const [squareTo, setSquareTo] = useState<Square | null>(null)
  const [effects, setEffects] = useState<Effect[]>([])
  const [action, setAction] = useState<Action | null>(null)
  const [board, setBoard] = useState<Board>(() => getRandomBoard())
  const [turn, setTurn] = useState<Team>('ally')

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
