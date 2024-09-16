import { useContext } from "react";
import BoxWithAgent from "../interfaces/BoxWithAgent";
import getDistance from "../utils/getDistance";
import killAgent from "../utils/killAgent";
import { GameContext } from "../contexts/GameContext";
import Box from "../interfaces/Box";
import isAlly from "../utils/isAlly";

export default function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error("Context doesn't have a Provider");

  const { setBoard, board, selectedAgent, setSelectedAgent } = context;

  const damageAgent = (
    selectedAgent: BoxWithAgent,
    targetAgent: BoxWithAgent
  ) => {
    const attackDistance: number = 1;
    const distance = getDistance(selectedAgent!.position, targetAgent.position);
    if (distance != attackDistance) return;

    targetAgent.agent.health -= selectedAgent.agent.attack;

    if (targetAgent.agent.health == 0) {
      killAgent(board, targetAgent, setBoard);
    }
  };

  const moveAgent = (selectedAgent: BoxWithAgent, selectedBox: Box) => {
    const distance = getDistance(selectedAgent!.position, selectedBox.position);
    const selectedAgentSpeed = selectedAgent!.agent.speed;

    if (distance <= selectedAgentSpeed) {
      const newBoard = JSON.parse(JSON.stringify(board));
      const selectedAgentPosition = { ...selectedBox.position };
      const originalPosition = selectedAgent!.position;
      const { x: agentX, y: agentY } = selectedAgentPosition;
      const { x: originalX, y: originalY } = originalPosition;

      newBoard.grid[agentY][agentX] = {
        ...selectedAgent,
        position: selectedAgentPosition,
      };

      newBoard.grid[originalY][originalX] = {
        type: "empty",
        position: originalPosition,
      };

      setBoard(newBoard);
    }
  };

  const selectAgent = (box: BoxWithAgent) => {
    if (isAlly(box)) {
      setSelectedAgent(box);
    }
  };

  const moveSelectedAgent = (box: Box) => {
    if (selectedAgent) {
      moveAgent(selectedAgent, box);
      setSelectedAgent(null);
    }
  };
  const attackEnemyAgent = (box: BoxWithAgent) => {
    if (selectedAgent && box.team === "enemy") {
      damageAgent(selectedAgent, box);
      setSelectedAgent(null);
    }
  };

  return {
    ...context,
    damageAgent,
    moveAgent,
    selectAgent,
    moveSelectedAgent,
    attackEnemyAgent,
  };
}
