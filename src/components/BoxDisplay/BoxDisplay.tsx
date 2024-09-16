import Box from "../../interfaces/Box";
import BoxWithAgent from "../../interfaces/BoxWithAgent";
import "./BoxDisplay.css";

interface BoxDisplayProps {
  box: Box;
  onClick: () => void;
  bgColor: string;
}

export default function BoxDisplay({ box, onClick, bgColor }: BoxDisplayProps) {
  const color = box.type != "collision" ? bgColor : "";
  const isBoxWithAgent = box.type === "agent";
  const boxWithAgent = isBoxWithAgent ? (box as BoxWithAgent) : null;
  const flip = isBoxWithAgent ? (boxWithAgent?.team == "ally" ? 1 : -1) : 1;

  return (
    <button
      onClick={onClick}
      className={`game__box ${box.type} ${boxWithAgent?.team}`}
      style={{ backgroundColor: color, transform: `scaleX(${flip})` }}
    >
      {isBoxWithAgent && boxWithAgent?.agent && (
        <img src={boxWithAgent.agent.icon} alt={boxWithAgent.agent.name} />
      )}
    </button>
  );
}
