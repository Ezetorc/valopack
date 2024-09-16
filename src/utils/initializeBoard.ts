import { defaultAttributes } from "../constants/defaultAttributes";
import { allyPositions, enemyPositions } from "../constants/general";
import Agent from "../interfaces/Agent";
import BoxWithAgent from "../interfaces/BoxWithAgent";
import Map from "../interfaces/Map";
import { Team } from "../types/Team";
import { Vector2 } from "../types/Vector2";

export default function initializeBoard(
  board: Map,
  allyTeam: Agent[],
  enemyTeam: Agent[]
): Map {
  const newBoard = JSON.parse(JSON.stringify(board));

  const placeAgentsOnBoard = (
    agents: Agent[],
    positions: Vector2[],
    team: Team
  ) => {
    positions.forEach((position, index) => {
      const agent: Agent = agents[index];
      if (!agent) return;

      const boxWithAgent: BoxWithAgent = {
        type: "agent",
        position: {
          x: position.x,
          y: position.y,
        },
        agent: { ...agent, ...defaultAttributes },
        team: team,
      };

      const row = newBoard.grid[position.y];
      if (row) {
        row[position.x] = boxWithAgent;
      }
    });
  };

  placeAgentsOnBoard(allyTeam, allyPositions, "ally");
  placeAgentsOnBoard(enemyTeam, enemyPositions, "enemy");

  return newBoard;
}
