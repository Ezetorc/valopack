import { useCallback } from 'react'
import BoxDisplay from '../BoxDisplay/BoxDisplay'
import getSquareColor from '../../utils/getSquareColor'
import SquareDisplay from '../SquareDisplay/SquareDisplay'
import getBoxOpacity from '../../utils/getBoxOpacity'
import Square from '../../classes/Square'
import useBoard from '../../hooks/useBoard'
import './Board.css'

interface BoardProps {
  boardRef: React.RefObject<HTMLDivElement>
}

export default function Board ({ boardRef }: BoardProps) {
  const { board, setSquareFrom, setSquareTo, action } = useBoard()

  const handleClick = useCallback(
    (clickedSquare: Square) => {
      if (action) {
        setSquareTo(clickedSquare)
      } else {
        setSquareFrom(clickedSquare)
      }
    },
    [action, setSquareFrom, setSquareTo]
  )

  return (
    <div className='board' ref={boardRef}>
      {board.grid.flat().map((square, squareIndex) => (
        <SquareDisplay
          onClick={() => handleClick(square)}
          color={getSquareColor(square, board)}
          key={`square-${squareIndex}`}
        >
          {square.boxes.map((box, boxIndex) => (
            <BoxDisplay
              box={box}
              key={`box-${squareIndex}-${boxIndex}`}
              opacity={getBoxOpacity(square, box)}
            />
          ))}
        </SquareDisplay>
      ))}
    </div>
  )
}
