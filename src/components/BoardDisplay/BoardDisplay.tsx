import { useCallback, useRef } from 'react'
import BoxDisplay from '../BoxDisplay/BoxDisplay'
import SquareDisplay from '../SquareDisplay/SquareDisplay'
import Square from '../../classes/Square'
import useBoard from '../../hooks/useBoard'
import Player from '../../classes/Player'
import isValidDistance from '../../utils/isValidDistance'
import { Action } from '../../types/Action'
import useAbility from '../../hooks/useAbility'
import Ability from '../../interfaces/Ability'
import isWithinRange from '../../utils/isWithinRange'
import getDistance from '../../utils/getDistance'
import './BoardDisplay.css'

export default function BoardDisplay () {
  const {
    board,
    setSquareFrom,
    setSquareTo,
    action,
    movePlayer,
    squareFrom,
    resetActions,
    attackPlayer,
    handleEffects,
    toggleTurn
  } = useBoard()
  const { handleAbility } = useAbility()
  const boardRef = useRef<HTMLDivElement>(null)

  const changeTurn = useCallback(() => {
    handleEffects()
    toggleTurn()
  }, [handleEffects, toggleTurn])

  const showInvalidMove = useCallback(() => {
    boardRef.current?.classList.add('invalid-move')
    setTimeout(() => boardRef.current?.classList.remove('invalid-move'), 300)
  }, [boardRef])

  const handleMoveAction = useCallback(
    (squareToMove: Square) => {
      if (!squareFrom) return
      const player: Player = squareFrom.getBox('player') as Player
      if (!player) return

      const validDistance: boolean = isValidDistance(
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
      squareFrom,
      resetActions,
      showInvalidMove,
      setSquareTo,
      changeTurn
    ]
  )

  const handleAttackAction = useCallback(
    (squareToAttack: Square) => {
      if (!squareFrom) return

      const playerTo: Player = squareToAttack.getBox('player') as Player
      const canAttack: boolean =
        playerTo &&
        playerTo.team == 'enemy' &&
        isValidDistance(squareFrom.position, squareToAttack.position, 1)

      if (canAttack) {
        const playerFrom: Player = squareFrom.getBox('player') as Player
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
      squareFrom,
      showInvalidMove,
      changeTurn
    ]
  )

  const handleAbilityAction = useCallback(
    (targetSquare: Square) => {
      if (!squareFrom) return
      const playerFrom = squareFrom.getBox('player') as Player
      if (!playerFrom) return

      const { abilities } = playerFrom.agent
      const selectedAbility: Ability =
        action === 'ability0' ? abilities[0] : abilities[1]

      const distance: number = getDistance(
        squareFrom.position,
        targetSquare.position
      )

      const canUseAbility: boolean =
        isWithinRange(distance, selectedAbility.useRange) &&
        targetSquare
          .getBoxesTypes()
          .every(boxType => selectedAbility.validBoxTypes.includes(boxType))

      if (canUseAbility) {
        handleAbility(selectedAbility, targetSquare)
        resetActions()
        changeTurn()
      } else {
        showInvalidMove()
        setSquareTo(null)
      }
    },
    [
      action,
      handleAbility,
      resetActions,
      setSquareTo,
      showInvalidMove,
      squareFrom,
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
    [action, setSquareFrom, setSquareTo, handleAction]
  )

  return (
    <div className='board' ref={boardRef}>
      {board.grid.flat().map((square, squareIndex) => (
        <SquareDisplay
          onClick={() => handleClick(square)}
          color={square.getColor(board.colors)}
          style={square.style}
          classes={square.classes}
          key={`square-${squareIndex}`}
        >
          {square.boxes.map((box, boxIndex) => (
            <BoxDisplay
              box={box}
              key={`box-${squareIndex}-${boxIndex}`}
              opacity={box.getOpacity(square)}
            />
          ))}
        </SquareDisplay>
      ))}
    </div>
  )
}
