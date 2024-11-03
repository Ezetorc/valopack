import { useContext, useEffect } from "react"
import GameContextType from "../../../models/GameContextType"
import { Team } from "../../../models/Team"
import { teamColors } from "../../../valopack.config"
import { GameContext } from "../contexts/GameContext"
import { Method, GetParams, Square, Player, Tag, Ability, AddBoxParams, RemoveBoxParams, ModifyAttributeParams, AddTagParams, WaitParams, ShowFadeParams, AddClassParams, RemoveTagParams, RemoveClassParams, Box, Board } from "../models"
import { Parser } from "../services/Parser.service"

export function useAbility () {
  const context: GameContextType | undefined = useContext(GameContext)
  if (!context) throw new Error("Context doesn't have a provider")

  const { squareFrom, board, setBoard, setEffects, turn } = context

  useEffect(() => console.log('turn => ', turn), [turn])

  const handleEffects = (): void => {
    setEffects(prevEffects => {
      prevEffects.forEach(effect => {
        effect.turnsLeft -= 1

        if (effect.turnsLeft <= 0) {
          effect.methods.forEach(method => handleMethod(method, effect.square))
        }
      })

      return prevEffects.filter(effect => effect.turnsLeft > 0)
    })
  }

  const getParsedMethod = (method: Method): Method => {
    const { type, params } = method

    if (type == 'add-tag' || type == 'remove-tag') {
      if ('tags' in params) {
        params['tags'] = Parser.getParsedTags(params['tags'], turn)
      }
    }

    if ('get' in params) {
      const getParams: GetParams = params['get']

      if (getParams.tags) {
        getParams.tags = Parser.getParsedTags(getParams.tags, turn)
      }

      if (getParams.filters?.tags) {
        getParams.filters.tags = Parser.getParsedTags(
          getParams.filters.tags,
          turn
        )
      }

      if (getParams.filters?.team) {
        console.log('antes de getParsedTeamOption turn: ', turn)
        getParams.filters.team = Parser.getParsedTeamOption(
          getParams.filters.team,
          turn
        )
      }
    }

    return method
  }

  const applyFilters = (
    squares: Square[],
    filters: GetParams['filters']
  ): void => {
    if (!filters) return
    for (let i = squares.length - 1; i >= 0; i--) {
      const square = squares[i]
      const player: Player = square.getBox('player') as Player

      if (filters.boxTypes) {
        const hasAllBoxTypes = filters.boxTypes.every(boxType =>
          square.boxes.some(box => box.type === boxType)
        )

        if (!hasAllBoxTypes) {
          squares.splice(i, 1)
          continue
        }
      }

      if (filters.team && player) {
        console.log('antes de getParsedTeamOption turn: ', turn)
        const parsedTeam: Team = Parser.getParsedTeamOption(filters.team, turn)

        if (player.team !== parsedTeam) {
          squares.splice(i, 1)
          continue
        }
      }

      if (filters.tags) {
        const hasTags: boolean = square.boxes.some(box =>
          box.has(filters.tags as Tag[])
        )

        if (!hasTags) {
          squares.splice(i, 1)
          continue
        }
      }
    }
  }

  const handleAbility = (ability: Ability, squareTo: Square): void => {
    const { methods } = ability

    methods.forEach(method => {
      handleMethod(method, squareTo)
    })
  }

  const handleMethod = (method: Method, squareTo: Square): void => {
    const { type, params } = method

    if (type == 'add-box') {
      handleAddBoxMethod(params as AddBoxParams, squareTo)
    } else if (type == 'remove-box') {
      handleRemoveBoxMethod(params as RemoveBoxParams, squareTo)
    } else if (type == 'modify-attribute') {
      handleModifyAttributeMethod(params as ModifyAttributeParams, squareTo)
    } else if (type == 'add-tag') {
      handleAddTagMethod(params as AddTagParams, squareTo)
    } else if (type == 'wait') {
      handleWaitMethod(params as WaitParams, squareTo)
    } else if (type == 'show-fade') {
      handleShowFadeMethod(params as ShowFadeParams, squareTo)
    } else if (type == 'add-class') {
      handleAddClassMethod(params as AddClassParams, squareTo)
    } else if (type == 'remove-tag') {
      handleRemoveTagMethod(params as RemoveTagParams, squareTo)
    } else if (type == 'remove-class') {
      handleRemoveClassMethod(params as RemoveClassParams, squareTo)
    }
  }

  const handleRemoveTagMethod = (params: RemoveTagParams, squareTo: Square) => {
    const squares: Square[] = handleGetMethod(params.get, squareTo)
    const parsedTags: Tag[] = Parser.getParsedTags(params.tags, turn)

    squares.forEach(square => {
      square.boxes.forEach(box => {
        box.tags = box.tags.filter(
          tag => !parsedTags.some(parsedTag => parsedTag == tag)
        )
      })
    })
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
    } else if (getBy === 'tag' || getBy === 'all') {
      squares.push(...board.grid.flat())

      if (params.tags) {
        const parsedTags: Tag[] = Parser.getParsedTags(params.tags, turn)

        squares.forEach(square => {
          const hasTags = square.boxes.some(box => box.has(parsedTags as Tag[]))
          if (!hasTags) {
            const index = squares.indexOf(square)
            if (index > -1) squares.splice(index, 1)
          }
        })
      }
    }

    applyFilters(squares, filters)

    return squares
  }

  const handleAddBoxMethod = (params: AddBoxParams, squareTo: Square) => {
    const squares: Square[] = handleGetMethod(params.get, squareTo)
    const boxToAdd: Box = new Box({ type: params.boxType })

    squares.forEach(square => {
      square.addBox(boxToAdd)
    })
  }

  const handleRemoveBoxMethod = (params: RemoveBoxParams, squareTo: Square) => {
    const squares: Square[] = handleGetMethod(params.get, squareTo)

    squares.forEach(square =>
      params.boxTypes.forEach(boxType => {
        square.removeBox(boxType)
      })
    )
  }

  const handleModifyAttributeMethod = (
    params: ModifyAttributeParams,
    squareTo: Square
  ) => {
    const squares: Square[] = handleGetMethod(params.get, squareTo)

    squares.forEach(square => {
      const player = square.getBox('player')
      if (player) {
        ;(player as Player).attributes[params.attribute] += params.amount
      }
    })
  }

  const handleAddTagMethod = (params: AddTagParams, squareTo: Square) => {
    const squares: Square[] = handleGetMethod(params.get, squareTo)
    const parsedTags: Tag[] = Parser.getParsedTags(params.tags, turn)

    squares.forEach(square =>
      square.boxes.forEach(box => {
        box.tags.push(...parsedTags)
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
          methods: params.methods.map(method => getParsedMethod(method)),
          turnsLeft: params.time + 1,
          square: squareTo
        }
      ])
    }
  }

  const handleShowFadeMethod = (params: ShowFadeParams, squareTo: Square) => {
    const squares: Square[] = handleGetMethod(params.get, squareTo)
    let color: string = params.color

    if (params.color == 'current-team-color') {
      color = teamColors[turn]
    } else {
      color = turn == 'ally' ? teamColors['enemy'] : teamColors['ally']
    }

    squares.forEach(square => {
      square.addStyleProperty('--fade-color', color)
      square.addStyleProperty('--fade-duration', `${params.duration}s`)
      square.addClass('fade')

      setTimeout(() => {
        square.removeClass('fade')
      }, params.duration * 1000)
    })
  }

  const handleAddClassMethod = (params: AddClassParams, squareTo: Square) => {
    const squares: Square[] = handleGetMethod(params.get, squareTo)

    squares.forEach(square => {
      params.classNames.forEach(className => {
        square.addClass(className)
      })
    })
  }

  const handleRemoveClassMethod = (
    params: RemoveClassParams,
    squareTo: Square
  ) => {
    const squares: Square[] = handleGetMethod(params.get, squareTo)

    squares.forEach(square => {
      params.classNames.forEach(className => {
        square.removeClass(className)
      })
    })
  }

  return { ...context, handleAbility, handleMethod, handleEffects }
}
