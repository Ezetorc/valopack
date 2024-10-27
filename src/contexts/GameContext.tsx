import { createContext, ReactNode, useEffect, useState } from 'react'
import { Team } from '../types/Team'
import { Action } from '../types/Action'
import Effect from '../interfaces/Effect'
import GameContextType from '../interfaces/GameContextType'
import Square from '../classes/Square'
import Board from '../classes/Board'
import getRandomBoard from '../utils/getRandomBoard'

export const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameContextProvider ({ children }: { children: ReactNode }) {
  const [squareFrom, setSquareFrom] = useState<Square | null>(null)
  const [squareTo, setSquareTo] = useState<Square | null>(null)
  const [effects, setEffects] = useState<Effect[]>([])
  const [action, setAction] = useState<Action | null>(null)
  const [board, setBoard] = useState<Board>(() => getRandomBoard())
  const [turn, setTurn] = useState<Team>('ally')

  useEffect(() => console.log('turn: ', turn), [turn])
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
