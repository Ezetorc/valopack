import { useCallback } from "react";
import useGame from "../../hooks/useGame";
import BoxDisplay from "../BoxDisplay/BoxDisplay";
import getSquareColor from "../../utils/getSquareColor";
import SquareDisplay from "../SquareDisplay/SquareDisplay";
import getBoxOpacity from "../../utils/getBoxOpacity";
import Box from "../../classes/Box";
import "./Board.css";
import Square from "../../classes/Square";

interface BoardProps {
  setShowActions: (showActions: boolean) => void;
  boardRef: React.RefObject<HTMLDivElement>;
}

export default function Board({ setShowActions, boardRef }: BoardProps) {
  const {
    board,
    setSelectedBox,
    setTargetBox,
    action,
    targetBox,
    selectedBox,
    map,
    setSelectedSquare,
  } = useGame();

  const handleClick = useCallback(
    (square: Square, box: Box) => {
      setSelectedSquare(square);
      if (box.type !== "player" && action && targetBox) {
        setSelectedBox(null);
        setShowActions(false);
        return;
      }

      if (!selectedBox && box.type === "player") {
        setSelectedBox(box);
        setShowActions(true);
        return;
      }

      if (action) {
        setTargetBox(box);
        return;
      }

      if (box.type !== "player") {
        setSelectedBox(null);
        setShowActions(false);
        return;
      }

      setSelectedBox(box);
      setShowActions(true);
    },
    [
      selectedBox,
      setSelectedBox,
      setShowActions,
      setTargetBox,
      action,
      targetBox,
      setSelectedSquare,
    ]
  );

  return (
    <div className="board" ref={boardRef}>
      {board.grid.flat().map((square, squareIndex) => (
        <SquareDisplay
          color={getSquareColor(square, map)}
          key={`square-${squareIndex}`}
        >
          {square.boxes.map((box, boxIndex) => (
            <BoxDisplay
              box={box}
              onClick={() => handleClick(square, box)}
              key={`box-${squareIndex}-${boxIndex}`}
              opacity={getBoxOpacity(square, box)}
            ></BoxDisplay>
          ))}
        </SquareDisplay>
      ))}
    </div>
  );
}
