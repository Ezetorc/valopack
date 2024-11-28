import { create } from 'zustand'
import { getRandomBoard } from '../utilities/getRandomBoard'
import { GameStore } from '../models/GameStore'

export const getGameStore = create<GameStore>(set => ({
  board: getRandomBoard(),
  setBoard: (newBoard) => set(state => ({
    board: typeof newBoard === 'function' ? newBoard(state.board) : newBoard
  })),

  squareFrom: null,
  setSquareFrom: (newSquareFrom) => set(state => ({
    squareFrom: typeof newSquareFrom === 'function' ? newSquareFrom(state.squareFrom) : newSquareFrom
  })),

  squareTo: null,
  setSquareTo: (newSquareTo) => set(state => ({
    squareTo: typeof newSquareTo === 'function' ? newSquareTo(state.squareTo) : newSquareTo
  })),

  turn: 'ally',
  setTurn: (newTurn) => set(state => ({
    turn: typeof newTurn === 'function' ? newTurn(state.turn) : newTurn
  })),

  action: null,
  setAction: (newAction) => set(state => ({
    action: typeof newAction === 'function' ? newAction(state.action) : newAction
  })),

  effects: [],
  setEffects: (updateFn) => set(state => ({
    effects: typeof updateFn === 'function' ? updateFn(state.effects) : updateFn
  }))
}))
