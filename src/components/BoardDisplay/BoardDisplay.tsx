import { useCallback } from 'react'
import BoxDisplay from '../BoxDisplay/BoxDisplay'
import SquareDisplay from '../SquareDisplay/SquareDisplay'
import Square from '../../classes/Square'
import useBoard from '../../hooks/useBoard'
import './BoardDisplay.css'

interface BoardDisplayProps {
  boardRef: React.RefObject<HTMLDivElement>
}

export default function BoardDisplay ({ boardRef }: BoardDisplayProps) {
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
