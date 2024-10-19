import { useCallback, useRef } from 'react'
import BoxDisplay from '../BoxDisplay/BoxDisplay'
import SquareDisplay from '../SquareDisplay/SquareDisplay'
import Square from '../../classes/Square'
import useBoard from '../../hooks/useBoard'
import Player from '../../classes/Player'
import isValidDistance from '../../utils/isValidDistance'
import { Action } from '../../types/Action'
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
    attackPlayer
  } = useBoard()
  const boardRef = useRef<HTMLDivElement>(null)

  const showInvalidMove = useCallback(() => {
    boardRef.current?.classList.add('invalid-move')
    setTimeout(() => boardRef.current?.classList.remove('invalid-move'), 300)
  }, [boardRef])

  const handleMoveAction = useCallback(
    (squareToMove: Square) => {
      if (!squareFrom) return
      const player: Player = squareFrom.get('player') as Player
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
      } else {
        showInvalidMove()
      }
    },
    [movePlayer, squareFrom, resetActions, showInvalidMove]
  )

  const handleAttackAction = useCallback(
    (squareToAttack: Square) => {
      if (!squareFrom) return

      const playerTo: Player = squareToAttack.get('player') as Player
      const canAttack: boolean =
        playerTo &&
        playerTo.team == 'enemy' &&
        isValidDistance(squareFrom.position, squareToAttack.position, 1)

      if (canAttack) {
        const playerFrom: Player = squareFrom.get('player') as Player
        attackPlayer(playerFrom, playerTo)
        resetActions()
      } else {
        showInvalidMove()
        setSquareTo(null)
      }
    },
    [attackPlayer, resetActions, setSquareTo, squareFrom, showInvalidMove]
  )

  const handleAction = useCallback(
    (action: Action, square: Square): void => {
      const actions: { [key in Action]: (square: Square) => void } = {
        move: handleMoveAction,
        attack: handleAttackAction,
        ability0: handleMoveAction,
        ability1: handleMoveAction
      }

      actions[action](square)
    },
    [handleAttackAction, handleMoveAction]
  )

  const handleClick = useCallback(
    (clickedSquare: Square) => {
      if (action !== null) {
        handleAction(action, clickedSquare)
      } else {
        if (action) {
          setSquareTo(clickedSquare)
        } else {
          setSquareFrom(clickedSquare)
        }
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
