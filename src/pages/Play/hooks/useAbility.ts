import { teamColors } from '../../../valopack.config'
import { Ability } from '../models/Ability'
import { AddClassParams } from '../models/AddClassParams'
import { AddEntityParams } from '../models/AddEntityParams'
import { AddTagParams } from '../models/AddTagParams'
import { Board } from '../models/Board'
import { Effect } from '../models/Effect'
import { Entity } from '../models/Entity'
import { GameStore } from '../models/GameStore'
import { GetParams } from '../models/GetParams'
import { Method } from '../models/Method'
import { ModifyAttributeParams } from '../models/ModifyAttributeParams'
import { Player } from '../models/Player'
import { RemoveClassParams } from '../models/RemoveClassParams'
import { RemoveEntityParams } from '../models/RemoveEntityParams'
import { RemoveTagParams } from '../models/RemoveTagParams'
import { ShowFadeParams } from '../models/ShowFadeParams'
import { Square } from '../models/Square'
import { Tag } from '../models/Tag'
import { WaitParams } from '../models/WaitParams'
import { Parser } from '../services/Parser.service'
import { getGameStore } from '../stores/getGameStore'
import { applyFilters } from '../utilities/applyFilters'

export function useAbility () {
  const gameStore: GameStore = getGameStore()
  const { squareFrom, board, setBoard, setEffects, turn } = gameStore

  const getUpdatedEffects = (effects: Effect[]): Effect[] => {
    let i: number = 0

    while (i < effects.length) {
      const effect: Effect = effects[i]

      effect.turnsLeft -= 1

      if (effect.turnsLeft <= 0) {
        effect.methods.forEach(method => {
          handleMethod(method, effect.square)
        })

        effects.splice(i, 1)
      } else {
        i++
      }
    }

    return effects
  }

  const handleAbility = (
    ability: Ability,
    squareFrom: Square,
    squareTo: Square
  ): void => {
    const player: Entity | undefined = squareFrom.getEntityByType('player')

    if (player && ability.index !== undefined) {
      ;(player as Player).abilityUses[ability.index] -= 1
    }

    ability.methods.forEach(method => {
      handleMethod(method, squareTo)
    })
  }

  const handleMethod = (method: Method, squareTo: Square): void => {
    const { type, params } = method

    if (type == 'add-box') {
      addEntity(params as AddEntityParams, squareTo)
    } else if (type == 'remove-box') {
      removeEntity(params as RemoveEntityParams, squareTo)
    } else if (type == 'modify-attribute') {
      modifyAttribute(params as ModifyAttributeParams, squareTo)
    } else if (type == 'add-tag') {
      addTag(params as AddTagParams, squareTo)
    } else if (type == 'wait') {
      wait(params as WaitParams, squareTo)
    } else if (type == 'show-fade') {
      showFade(params as ShowFadeParams, squareTo)
    } else if (type == 'add-class') {
      addClass(params as AddClassParams, squareTo)
    } else if (type == 'remove-tag') {
      removeTag(params as RemoveTagParams, squareTo)
    } else if (type == 'remove-class') {
      removeClass(params as RemoveClassParams, squareTo)
    }
  }

  const removeTag = (params: RemoveTagParams, squareTo: Square): void => {
    const squares: Square[] = getSquares(params.get, squareTo)
    const parsedTags: Tag[] = Parser.getParsedTags(params.tags, turn)

    squares.forEach(square => {
      square.entities.forEach(entity => {
        entity.tags = entity.tags.filter(
          tag => !parsedTags.some(parsedTag => parsedTag == tag)
        )
      })
    })
  }

  const getSquares = (params: GetParams, squareTo: Square): Square[] => {
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
          const hasTags: boolean = square.entities.some(entity =>
            entity.has(parsedTags as Tag[])
          )

          if (!hasTags) {
            const index: number = squares.indexOf(square)

            if (index > -1) {
              squares.splice(index, 1)
            }
          }
        })
      }
    }

    applyFilters(squares, filters, turn)

    return squares
  }

  const addEntity = (params: AddEntityParams, squareTo: Square): void => {
    const squares: Square[] = getSquares(params.get, squareTo)
    const entityToAdd: Entity = new Entity({ type: params.entityType })

    squares.forEach(square => {
      square.addEntity(entityToAdd)
    })
  }

  const removeEntity = (params: RemoveEntityParams, squareTo: Square): void => {
    const squares: Square[] = getSquares(params.get, squareTo)

    squares.forEach(square =>
      params.entityTypes.forEach(entityType => {
        square.removeEntity(entityType)
      })
    )
  }

  const modifyAttribute = (
    params: ModifyAttributeParams,
    squareTo: Square
  ): void => {
    const squares: Square[] = getSquares(params.get, squareTo)

    squares.forEach(square => {
      const player: Entity | undefined = square.getEntityByType('player')

      if (player instanceof Player) {
        player.attributes[params.attribute] += params.amount
      }
    })
  }

  const addTag = (params: AddTagParams, squareTo: Square): void => {
    const squares: Square[] = getSquares(params.get, squareTo)
    const parsedTags: Tag[] = Parser.getParsedTags(params.tags, turn)

    squares.forEach(square =>
      square.entities.forEach(entity => {
        entity.tags.push(...parsedTags)
      })
    )
  }

  const wait = (params: WaitParams, squareTo: Square): void => {
    if (params.type == 'miliseconds') {
      setTimeout(() => {
        params.methods.forEach(method => {
          handleMethod(method, squareTo)
        })

        const newBoard: Board = new Board(board.colors, [...board.grid])

        setBoard(newBoard)
      }, params.time)
    } else {
      const newEffect: Effect = {
        methods: params.methods.map(method =>
          Parser.getParsedMethod(method, turn)
        ),
        turnsLeft: params.time + 1,
        square: squareTo
      }

      console.log('setEffects(newEffect), newEffect => ', newEffect)
      setEffects([newEffect])
      // setEffects([...effects, newEffect])
    }
  }

  const showFade = (params: ShowFadeParams, squareTo: Square): void => {
    const squares: Square[] = getSquares(params.get, squareTo)
    let color: string = params.color

    if (params.color == 'current-team-color') {
      color = teamColors[turn]
    } else {
      color = turn == 'ally' ? teamColors['enemy'] : teamColors['ally']
    }

    squares.forEach(square => {
      square.addStyleProperty('--fade-color', color)
      square.addStyleProperty('--fade-duration', `${params.duration}s`)
      square.addClass('animate-fade')

      setTimeout(() => {
        square.removeClass('animate-fade')
      }, params.duration * 1000)
    })
  }

  const addClass = (params: AddClassParams, squareTo: Square): void => {
    const squares: Square[] = getSquares(params.get, squareTo)

    squares.forEach(square => {
      params.classNames.forEach((className: string) => {
        square.addClass(className)
      })
    })
  }

  const removeClass = (params: RemoveClassParams, squareTo: Square): void => {
    const squares: Square[] = getSquares(params.get, squareTo)

    squares.forEach(square => {
      params.classNames.forEach(className => {
        square.removeClass(className)
      })
    })
  }

  return { ...gameStore, handleAbility, handleMethod, getUpdatedEffects }
}
