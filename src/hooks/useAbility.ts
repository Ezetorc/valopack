import { useContext } from 'react'
import GameContextType from '../interfaces/GameContextType'
import { GameContext } from '../contexts/GameContext'
import Ability from '../interfaces/Ability'
import Method from '../interfaces/Method'
import AddParams from '../interfaces/MethodParams/AddParams'
import GetParams from '../interfaces/MethodParams/GetParams'
import Square from '../classes/Square'
import applyFilters from '../utils/applyFilters'
import Box from '../classes/Box'
import RemoveParams from '../interfaces/MethodParams/RemoveParams'
import ModifyAttributeParams from '../interfaces/MethodParams/ModifyAttributeParams'
import Player from '../classes/Player'
import TagParams from '../interfaces/MethodParams/TagParams'
import WaitParams from '../interfaces/MethodParams/WaitParams'
import Board from '../classes/Board'

export default function useAbility () {
  const context: GameContextType | undefined = useContext(GameContext)
  if (!context) throw new Error("Context doesn't have a provider")

  const { squareFrom, board, setBoard, setEffects } = context

  const handleAbility = (ability: Ability, squareTo: Square): void => {
    const { methods } = ability

    methods.forEach(method => {
      handleMethod(method, squareTo)
    })
  }

  const handleMethod = (method: Method, squareTo: Square): void => {
    const { type, params } = method

    if (type == 'add') {
      handleAddMethod(params as AddParams, squareTo)
    } else if (type == 'remove') {
      handleRemoveMethod(params as RemoveParams, squareTo)
    } else if (type == 'modifyAttribute') {
      handleModifyAttributeMethod(params as ModifyAttributeParams, squareTo)
    } else if (type == 'tag') {
      handleTagMethod(params as TagParams, squareTo)
    } else if (type == 'wait') {
      handleWaitMethod(params as WaitParams, squareTo)
    }
  }

  const handleGetMethod = (params: GetParams, squareTo: Square): Square[] => {
    const { getBy, filters, range } = params
    const squares: Square[] = []

    if (getBy === 'squareFrom' && squareFrom) {
      squares.push(squareFrom)
    } else if (getBy === 'squareTo' && squareTo) {
      squares.push(squareTo)
    } else if (getBy === 'range') {
      squares.push(...board.getSquaresInRange(squareTo.position, range ?? 1))
    } else if (getBy === 'tag') {
      squares.push(...board.grid.flat())
    } else if (getBy === 'all') {
      squares.push(...board.grid.flat())
    }

    applyFilters(squares, filters)

    return squares
  }

  const handleAddMethod = (params: AddParams, squareTo: Square) => {
    const squares: Square[] = handleGetMethod(params.get, squareTo)
    const boxToAdd: Box = new Box({ type: params.boxType })

    squares.forEach(square => {
      square.add(boxToAdd)
    })
  }

  const handleRemoveMethod = (params: RemoveParams, squareTo: Square) => {
    const squares: Square[] = handleGetMethod(params.get, squareTo)

    squares.forEach(square =>
      params.boxTypes.forEach(boxType => {
        square.remove(boxType)
      })
    )
  }

  const handleModifyAttributeMethod = (
    params: ModifyAttributeParams,
    squareTo: Square
  ) => {
    const squares: Square[] = handleGetMethod(params.get, squareTo)

    squares.forEach(square => {
      const player = square.get('player')
      if (player) {
        ;(player as Player).attributes[params.attribute] += params.amount
      }
    })
  }

  const handleTagMethod = (params: TagParams, squareTo: Square) => {
    const squares: Square[] = handleGetMethod(params.get, squareTo)

    squares.forEach(square =>
      square.boxes.forEach(box => {
        box.tags.push(...params.tags)
      })
    )
  }

  const handleWaitMethod = (params: WaitParams, squareTo: Square) => {
    if (params.type == 'miliseconds') {
      setTimeout(() => {
        params.methods.forEach(method => handleMethod(method, squareTo))

        setBoard(prevBoard => new Board(prevBoard.colors, [...prevBoard.grid]))
      }, params.time)
    } else {
      setEffects(prevEffects => [
        ...prevEffects,
        {
          methods: params.methods,
          turnsLeft: params.time + 1,
          square: squareTo
        }
      ])
    }
  }

  return { ...context, handleAbility, handleMethod }
}
