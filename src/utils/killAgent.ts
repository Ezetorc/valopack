import BoxWithAgent from "../interfaces/BoxWithAgent";
import Map from "../interfaces/Map";

export default function killAgent(
  board: Map,
  agent: BoxWithAgent,
  setBoard: React.Dispatch<React.SetStateAction<Map>>
) {
  const updatedBoard = JSON.parse(JSON.stringify(board));
  const agentPosition = { ...agent.position };

  updatedBoard.grid[agentPosition.y][agentPosition.x] = {
    type: "empty",
    position: agentPosition,
  };

  setBoard(updatedBoard);
}
