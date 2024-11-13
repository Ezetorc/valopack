import { createContext, ReactNode, useEffect, useState } from 'react'
import { GameContextType } from '../../../models/GameContextType.ts'
import { Team } from '../../../models/Team.ts'
import { Action } from '../models/Action.ts'
import { Board } from '../models/Board.ts'
import { Effect } from '../models/Effect.ts'
import { Square } from '../models/Square.ts'
import { getRandomBoard } from '../utilities/getRandomBoard.ts'

export const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameContextProvider ({ children }: { children: ReactNode }) {
  const [squareFrom, setSquareFrom] = useState<Square | null>(null)
  const [squareTo, setSquareTo] = useState<Square | null>(null)
  const [effects, setEffects] = useState<Effect[]>([])
  const [action, setAction] = useState<Action | null>(null)
  const [board, setBoard] = useState<Board>(() => getRandomBoard())
  const [turn, setTurn] = useState<Team>('ally')

  useEffect(() => console.log(effects), [effects])

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
