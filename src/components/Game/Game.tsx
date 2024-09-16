import { useEffect } from "react";
import useSettings from "../../hooks/useSettings";
import { sectionsBg } from "../../constants/sectionsBg";
import BoxDisplay from "../BoxDisplay/BoxDisplay";
import getBackgroundColor from "../../utils/getBackgroundColor";
import Box from "../../interfaces/Box";
import BoxWithAgent from "../../interfaces/BoxWithAgent";
import useGame from "../../hooks/useGame";
import "./Game.css";

export default function Game() {
  const {
    selectedAgent,
    board,
    map,
    selectAgent,
    moveSelectedAgent,
    attackEnemyAgent,
  } = useGame();
  const { texts, updateSection } = useSettings();

  useEffect(
    () => updateSection(texts.game, sectionsBg.play, false),
    [texts.game, updateSection]
  );

  const handleClick = (selectedBox: Box) => {
    if (!selectedAgent) {
      if (selectedBox.type === "agent") {
        selectAgent(selectedBox as BoxWithAgent);
      }
      return;
    }

    if (selectedBox.type === "empty") {
      moveSelectedAgent(selectedBox);
      return;
    }

    if (selectedBox.type === "agent") {
      attackEnemyAgent(selectedBox as BoxWithAgent);
      return;
    }
  };

  return (
    <section className="game">
      <div className="game__board">
        {board.grid.map((row, rowIndex) =>
          row.map((box, boxIndex) => (
            <BoxDisplay
              onClick={() => handleClick(box)}
              key={`${rowIndex}-${boxIndex}`}
              box={box}
              bgColor={getBackgroundColor(box, map)}
            />
          ))
        )}
      </div>
    </section>
  );
}
