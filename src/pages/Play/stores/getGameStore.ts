import { create } from 'zustand'
import { getRandomBoard } from '../utilities/getRandomBoard'
import { GameStore } from '../models/GameStore'

export const getGameStore = create<GameStore>((set, get) => ({
  board: getRandomBoard(),
  getBoard: () => get().board,
  setBoard: newBoard => set({ board: newBoard }),

  squareFrom: null,
  getSquareFrom: () => get().squareFrom,
  setSquareFrom: newSquareFrom => set({ squareFrom: newSquareFrom }),

  squareTo: null,
  getSquareTo: () => get().squareTo,
  setSquareTo: newSquareTo => set({ squareTo: newSquareTo }),

  turn: 'ally',
  getTurn: () => get().turn,
  setTurn: newTurn => set({ turn: newTurn }),

  action: null,
  getAction: () => get().action,
  setAction: newAction => set({ action: newAction }),

  pendingActions: [],
  getPendingActions: () => get().pendingActions,
  setPendingActions: newPendingActions =>
    set({ pendingActions: newPendingActions })
}))
