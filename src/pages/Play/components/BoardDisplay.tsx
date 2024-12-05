import { useCallback, useRef } from 'react'
import { Square } from '../models/Square.ts'
import { useBoard } from '../hooks/useBoard.ts'
import { Player } from '../models/Player.ts'
import { Action } from '../models/Action.ts'
import { useAbility } from '../hooks/useAbility.ts'
import { Ability } from '../models/Ability.ts'
import { EntityDisplay } from './EntityDisplay.tsx'
import { SquareDisplay } from './SquareDisplay.tsx'
import { Distance } from '../services/Distance.service.ts'
import { getMissingEntityTypes } from '../utilities/getMissingEntityTypes.ts'
import { EntityType } from '../models/EntityType.ts'

export function BoardDisplay () {
  const {
    getBoard,
    setSquareFrom,
    setSquareTo,
    getAction,
    movePlayer,
    getSquareFrom,
    resetActions,
    attackPlayer,
    toggleTurn
  } = useBoard()
  const { handleAbility, updatePendingActions } = useAbility()
  const boardRef = useRef<HTMLDivElement>(null)

  const changeTurn = useCallback(() => {
    updatePendingActions()
    toggleTurn()
  }, [toggleTurn, updatePendingActions])

  const showInvalidMove = useCallback(() => {
    boardRef.current?.classList.add('animate-invalid_move')

    setTimeout(
      () => boardRef.current?.classList.remove('animate-invalid_move'),
      300
    )
  }, [boardRef])

  const handleMoveAction = useCallback(
    (squareToMove: Square) => {
      const squareFrom: Square | null = getSquareFrom()
      if (!squareFrom) return

      const player: Player = squareFrom.getEntityByType('player') as Player
      const validDistance: boolean = Distance.isValid(
        player.position,
        squareToMove.position,
        player.attributes.speed
      )
      const canMove: boolean = validDistance && squareToMove.isFree()

      if (canMove) {
        movePlayer(player, squareToMove)
        resetActions()
        changeTurn()
      } else {
        showInvalidMove()
        setSquareTo(null)
      }
    },
    [
      movePlayer,
      getSquareFrom,
      resetActions,
      showInvalidMove,
      setSquareTo,
      changeTurn
    ]
  )

  const handleAttackAction = useCallback(
    (squareToAttack: Square) => {
      const squareFrom: Square | null = getSquareFrom()
      if (!squareFrom) return

      const playerTo: Player = squareToAttack.getEntityByType(
        'player'
      ) as Player
      const canAttack: boolean =
        playerTo &&
        playerTo.teamSide === 'enemy' &&
        Distance.isValid(squareFrom.position, squareToAttack.position, 1)

      if (canAttack) {
        const playerFrom: Player = squareFrom.getEntityByType(
          'player'
        ) as Player
        attackPlayer(playerFrom, playerTo)
        resetActions()
        changeTurn()
      } else {
        showInvalidMove()
        setSquareTo(null)
      }
    },
    [
      attackPlayer,
      resetActions,
      setSquareTo,
      getSquareFrom,
      showInvalidMove,
      changeTurn
    ]
  )

  const handleAbilityAction = useCallback(
    (targetSquare: Square) => {
      const squareFrom: Square | null = getSquareFrom()

      if (!squareFrom) return

      const action: Action | null = getAction()
      const player: Player = squareFrom.getEntityByType('player') as Player
      const { abilities } = player
      const selectedAbility: Ability =
        action === 'ability0' ? abilities[0] : abilities[1]
      const distance: number = Distance.get(
        squareFrom.position,
        targetSquare.position
      )

      const validEntityTypes: (EntityType | 'empty')[] =
        selectedAbility.validEntityTypes
      const missingEntityTypes: EntityType[] = getMissingEntityTypes(
        validEntityTypes.filter(type => type !== 'empty') as EntityType[]
      )

      const targetEntities: 'empty' | EntityType[] = targetSquare.isEmpty()
        ? 'empty'
        : targetSquare.getEntitiesTypes()

      const canUseAbility: boolean =
        Distance.isWithinRange(distance, selectedAbility.useRange) &&
        (targetEntities === 'empty'
          ? validEntityTypes.includes('empty')
          : targetEntities.every(
              entityType =>
                validEntityTypes.includes(entityType) &&
                !missingEntityTypes.includes(entityType)
            ))

      if (canUseAbility) {
        handleAbility(selectedAbility, squareFrom, targetSquare)
        resetActions()
        changeTurn()
      } else {
        showInvalidMove()
        setSquareTo(null)
      }
    },
    [
      getAction,
      handleAbility,
      resetActions,
      setSquareTo,
      showInvalidMove,
      getSquareFrom,
      changeTurn
    ]
  )

  const handleAction = useCallback(
    (action: Action, square: Square): void => {
      const actions: { [key in Action]: (square: Square) => void } = {
        move: handleMoveAction,
        attack: handleAttackAction,
        ability0: handleAbilityAction,
        ability1: handleAbilityAction
      }

      actions[action](square)
    },
    [handleAttackAction, handleMoveAction, handleAbilityAction]
  )

  const handleClick = useCallback(
    (clickedSquare: Square) => {
      const action: Action | null = getAction()

      if (action === null) {
        if (action) {
          setSquareTo(clickedSquare)
        } else {
          setSquareFrom(clickedSquare)
        }
      } else {
        handleAction(action, clickedSquare)
      }
    },
    [getAction, setSquareFrom, setSquareTo, handleAction]
  )

  return (
    <div
      className='grid grid-cols-[repeat(7,_1fr)] grid-rows-[repeat(5,_1fr)] border-[20px] border-[#ffffff5e] items-center w-[90%] min-w-[700px] max-w-[900px] aspect-[16/10]'
      ref={boardRef}
    >
      {getBoard()
        .grid.flat()
        .map((square, squareIndex) => (
          <SquareDisplay
            onClick={() => handleClick(square)}
            color={square.getColor(getBoard().colors)}
            square={square}
            key={`square-${squareIndex}`}
          >
            {square.entities.map((entity, entityIndex) => (
              <EntityDisplay
                entity={entity}
                key={`box-${squareIndex}-${entityIndex}`}
                opacity={entity.getOpacity(square)}
              />
            ))}
          </SquareDisplay>
        ))}
    </div>
  )
}
