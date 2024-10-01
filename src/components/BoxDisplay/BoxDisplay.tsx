import Box from "../../interfaces/Box";
import Player from "../../interfaces/Player";
import "./BoxDisplay.css";

interface BoxDisplayProps {
  box: Box;
  onClick: () => void;
  bgColor: string;
}

export default function BoxDisplay({ box, onClick, bgColor }: BoxDisplayProps) {
  const isPlayer = box.type === "player";
  const player = isPlayer ? (box as Player) : null;
  const flip = isPlayer ? (player?.team == "ally" ? 1 : -1) : 1;

  return (
    <button
      onClick={onClick}
      className={`game__box ${box.type} ${player?.team}`}
      style={{ backgroundColor: bgColor, transform: `scaleX(${flip})` }}
    >
      {isPlayer && player?.agent && (
        <img src={player.agent.icon} alt={player.agent.name} />
      )}
    </button>
  );
}
