import { useSettings } from '../../../hooks/useSettings'
import { Hexadecimal } from '../../../models/Hexadecimal'
import { entities } from '../constants/entities'
import { Ability } from '../../../models/Ability'
import { AddClassParams } from '../models/AddClassParams'
import { AddEntityParams } from '../models/AddEntityParams'
import { AddTagParams } from '../models/AddTagParams'
import { Board } from '../models/Board'
import { Entity } from '../models/Entity'
import { GameStore } from '../models/GameStore'
import { GetParams } from '../models/GetParams'
import { Method } from '../models/Method'
import { ModifyAttributeParams } from '../models/ModifyAttributeParams'
import { PendingAction } from '../models/PendingAction'
import { PlayAudioParams } from '../models/PlayAudioParams'
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
import { ShowFlashParams } from '../models/ShowFlashParams'
import React from 'react'
import { maxLeveledAttributes } from '../../../valopack.config'

export function useAbility () {
  const gameStore: GameStore = getGameStore()
  const {
    squareFrom,
    board,
    setBoard,
    turn,
    setPendingActions,
    pendingActions
  } = gameStore

  const { playAudio } = useSettings()

  const updatePendingActions = (
    animationRef: React.RefObject<HTMLDivElement>
  ): void => {
    const newPendingActions: PendingAction[] = pendingActions
      .map(pendingAction => {
        if (pendingAction.turns <= 0) {
          pendingAction.methods.forEach(method => {
            handleMethod(method, pendingAction.squareTo, animationRef)
          })
        }

        return { ...pendingAction, turns: pendingAction.turns - 1 }
      })
      .filter(pendingAction => pendingAction.turns >= 0)

    setPendingActions(newPendingActions)
  }

  const handleAbility = (
    ability: Ability,
    squareFrom: Square,
    squareTo: Square,
    animationRef: React.RefObject<HTMLDivElement>
  ): void => {
    const player: Player | undefined = squareFrom.getPlayer()

    if (player && ability.index !== undefined) {
      player.abilityUses[ability.index] -= 1
    }

    ability.methods.forEach(method => {
      handleMethod(method, squareTo, animationRef)
    })
  }

  const handleMethod = (
    method: Method,
    squareTo: Square,
    animationRef: React.RefObject<HTMLDivElement>
  ): void => {
    const { type, params } = method

    if (type == 'add-entity') {
      addEntity(params as AddEntityParams, squareTo)
    } else if (type == 'remove-entity') {
      removeEntity(params as RemoveEntityParams, squareTo)
    } else if (type == 'modify-attribute') {
      modifyAttribute(params as ModifyAttributeParams, squareTo)
    } else if (type == 'add-tag') {
      addTag(params as AddTagParams, squareTo)
    } else if (type == 'wait') {
      wait(params as WaitParams, squareTo, animationRef)
    } else if (type == 'show-fade') {
      showFade(params as ShowFadeParams, squareTo)
    } else if (type == 'add-class') {
      addClass(params as AddClassParams, squareTo)
    } else if (type == 'remove-tag') {
      removeTag(params as RemoveTagParams, squareTo)
    } else if (type == 'remove-class') {
      removeClass(params as RemoveClassParams, squareTo)
    } else if (type == 'play-audio') {
      playAudio((params as PlayAudioParams).audioId)
    } else if (type == 'show-flash') {
      showFlash(params as ShowFlashParams, animationRef)
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

      if (!params.tags) return squares

      const parsedTags: Tag[] = Parser.getParsedTags(params.tags, turn)

      const filteredSquares: Square[] = squares.filter(square =>
        square.hasEntityWithTag(parsedTags)
      )

      return filteredSquares
    }

    applyFilters(squares, filters, turn)

    return squares
  }

  const addEntity = (params: AddEntityParams, squareTo: Square): void => {
    const squares: Square[] = getSquares(params.get, squareTo)
    const EntityClass: typeof Entity = entities[params.entityType]

    if (!EntityClass) {
      throw new Error(
        `No constructor found for entity type: ${params.entityType}`
      )
    }

    const entityToAdd: Entity = new EntityClass({
      type: params.entityType
    })

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
      const player: Player | undefined = square.getPlayer()

      if (player instanceof Player) {
        const currentValue = player.attributes[params.attribute]
        let newValue = currentValue + params.amount

        const maxLevel = maxLeveledAttributes[params.attribute] || Infinity
        newValue = Math.max(0, Math.min(newValue, maxLevel))

        player.attributes[params.attribute] = newValue
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

  const wait = (
    params: WaitParams,
    squareTo: Square,
    animationRef: React.RefObject<HTMLDivElement>
  ): void => {
    if (params.type == 'miliseconds') {
      setTimeout(() => {
        params.methods.forEach(method => {
          handleMethod(method, squareTo, animationRef)
        })

        const newBoard: Board = new Board(board.colors, [...board.grid])

        setBoard(newBoard)
      }, params.time)
    } else {
      const parsedMethods: Method[] = params.methods.map(method =>
        Parser.getParsedMethod(method, turn)
      )

      const newPendingAction: PendingAction = {
        turns: params.time,
        squareTo: squareTo,
        methods: parsedMethods
      }

      setPendingActions([...pendingActions, newPendingAction])
    }
  }

  const showFade = (params: ShowFadeParams, squareTo: Square): void => {
    const squares: Square[] = getSquares(params.get, squareTo)
    const color: Hexadecimal = Parser.getParsedColor(params.color, turn)

    squares.forEach(square => {
      square.addStyleProperty('--fade-color', color)
      square.addStyleProperty('--fade-duration', `${params.duration}s`)
      square.addClass('animate-fade')

      setTimeout(() => {
        square.removeClass('animate-fade')
      }, params.duration * 1000)
    })
  }

  const showFlash = (
    params: ShowFlashParams,
    animationRef: React.RefObject<HTMLDivElement>
  ): void => {
    if (animationRef?.current) {
      const element = animationRef.current
      element.style.setProperty('--flash-start-color', params.startColor)
      element.style.setProperty('--flash-end-color', params.endColor)
      element.style.setProperty('--flash-duration', `${params.duration}ms`)

      element.classList.add('animate-flash')

      setTimeout(() => {
        element.classList.remove('animate-flash')
      }, params.duration)
    }
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

  return { ...gameStore, handleAbility, handleMethod, updatePendingActions }
}
