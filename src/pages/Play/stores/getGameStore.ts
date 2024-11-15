import { create } from 'zustand'
import { getRandomBoard } from '../utilities/getRandomBoard'
import { GameStore } from '../models/GameStore'

export const getGameStore = create<GameStore>(set => ({
  board: getRandomBoard(),
  setBoard: newBoard => set({ board: newBoard }),

  squareFrom: null,
  setSquareFrom: newSquareFrom => set({ squareFrom: newSquareFrom }),

  squareTo: null,
  setSquareTo: newSquareTo => set({ squareTo: newSquareTo }),

  turn: 'ally',
  setTurn: newTurn => set({ turn: newTurn }),

  action: null,
  setAction: newAction => set({ action: newAction }),

  effects: [],
  setEffects: newEffects => set({ effects: newEffects })
}))
