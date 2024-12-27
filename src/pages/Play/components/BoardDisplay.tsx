import { useCallback, useRef, memo, useEffect, useState } from 'react'
import { useAbility } from '../hooks/useAbility'
import { useBoard } from '../hooks/useBoard'
import { Ability } from '../models/Ability'
import { Action } from '../models/Action'
import { Board } from '../models/Board'
import { Player } from '../models/Player'
import { Square } from '../models/Square'
import { Distance } from '../services/Distance.service'
import { EntityDisplay } from './EntityDisplay'
import { SquareDisplay } from './SquareDisplay'
import { isAbilityUsable } from '../utilities/isAbilityUsable'
import { getTargetEntities } from '../utilities/getTargetEntities'
import { getMissingEntities } from '../utilities/getMissingEntities'
import { ValidEntityTypes } from '../models/ValidEntityTypes'
import { EntityType } from '../models/EntityType'

const BoardDisplayComponent = ({ board }: { board: Board }) => {
  const {
    setSquareFrom,
    setSquareTo,
    action,
    movePlayer,
    squareFrom,
    resetActions,
    attackPlayer,
    toggleTurn
  } = useBoard()
  const { handleAbility, updatePendingActions } = useAbility()
  const [, forceUpdate] = useState(0)
  const boardRef = useRef<HTMLDivElement>(null)

  const changeTurn = useCallback(() => {
    updatePendingActions()
    toggleTurn()
  }, [toggleTurn, updatePendingActions])

  const executeAbility = useCallback(
    (ability: Ability, squareFrom: Square, targetSquare: Square) => {
      handleAbility(ability, squareFrom, targetSquare)
      resetActions()
      changeTurn()
    },
    [changeTurn, handleAbility, resetActions]
  )

  const showInvalidMove = useCallback(() => {
    boardRef.current?.classList.add('animate-invalid_move')

    setTimeout(() => {
      boardRef.current?.classList.remove('animate-invalid_move')
    }, 300)
  }, [])

  const handleInvalidAction = useCallback((): void => {
    showInvalidMove()
    setSquareTo(null)
  }, [showInvalidMove, setSquareTo])

  useEffect(() => {
    forceUpdate(prev => prev + 1)
    board.grid.flat().forEach(square => square.orderEntitiesByDepth())
  }, [board])

  const handleMoveAction = useCallback(
    (squareToMove: Square) => {
      if (!squareFrom) return

      const player: Player = squareFrom.getPlayer() as Player
      const validDistance: boolean = Distance.isValid(
        player.position,
        squareToMove.position,
        player.attributes.speed
      )
      const canMove: boolean =
        validDistance &&
        squareToMove.isFree() &&
        squareToMove.canEntityEnter(player)

      if (canMove) {
        movePlayer(player, squareToMove)
        resetActions()
        changeTurn()
      } else {
        handleInvalidAction()
      }
    },
    [movePlayer, squareFrom, resetActions, handleInvalidAction, changeTurn]
  )

  const handleAttackAction = useCallback(
    (squareToAttack: Square) => {
      if (!squareFrom) return

      const playerTo: Player = squareToAttack.getPlayer() as Player
      const canAttack: boolean =
        playerTo &&
        playerTo.teamSide === 'enemy' &&
        Distance.isValid(squareFrom.position, squareToAttack.position, 1)

      if (canAttack) {
        const playerFrom: Player = squareFrom.getPlayer() as Player
        attackPlayer(playerFrom, playerTo)
        resetActions()
        changeTurn()
      } else {
        handleInvalidAction()
      }
    },
    [attackPlayer, resetActions, handleInvalidAction, squareFrom, changeTurn]
  )

  const handleAbilityAction = useCallback(
    (targetSquare: Square) => {
      if (!squareFrom) return

      const player: Player = squareFrom.getPlayer() as Player
      const { abilities } = player
      const selectedAbility: Ability =
        action === 'ability0' ? abilities[0] : abilities[1]
      const distance: number = Distance.get(squareFrom.position, targetSquare.position)
      const validEntityTypes: ValidEntityTypes = selectedAbility.validEntityTypes
      const targetEntities: "empty" | EntityType[] = getTargetEntities(targetSquare)
      const missingEntityTypes: EntityType[] = getMissingEntities(validEntityTypes)
      const canUseAbility: boolean = isAbilityUsable(
        distance,
        selectedAbility.useRange,
        validEntityTypes,
        targetEntities,
        missingEntityTypes
      )

      if (canUseAbility) {
        executeAbility(selectedAbility, squareFrom, targetSquare)
      } else {
        handleInvalidAction()
      }
    },
    [action, squareFrom, handleInvalidAction, executeAbility]
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
      if (action === null) {
        setSquareFrom(clickedSquare)
      } else {
        handleAction(action, clickedSquare)
      }
    },
    [action, setSquareFrom, handleAction]
  )

  return (
    <div
      className='grid grid-cols-[repeat(7,_1fr)] grid-rows-[repeat(5,_1fr)] border-[20px] border-[#ffffff5e] items-center w-[90%] min-w-[700px] max-w-[900px] aspect-[16/10]'
      ref={boardRef}
    >
      {board.grid.flat().map((square, squareIndex) => (
        <SquareDisplay
          onClick={() => handleClick(square)}
          color={square.getColor(board.colors)}
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

export const BoardDisplay = memo(
  BoardDisplayComponent,
  (prevProps, nextProps) => {
    return prevProps.board === nextProps.board
  }
)
