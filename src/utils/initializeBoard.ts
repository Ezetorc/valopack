import { defaultAttributes } from "../constants/defaultAttributes";
import { allyPositions, enemyPositions } from "../constants/general";
import Agent from "../interfaces/Agent";
import Map from "../interfaces/Map";
import { Team } from "../types/Team";
import { Vector2 } from "../types/Vector2";
import Player from "../interfaces/Player";

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

      const player: Player = {
        type: "player",
        free: false,
        codes: [],
        position: {
          x: position.x,
          y: position.y,
        },
        agent: { ...agent },
        attributes: { ...defaultAttributes },
        team: team,
      };

      const row = newBoard.grid[position.y];
      if (row) {
        row[position.x] = player;
      }
    });
  };

  placeAgentsOnBoard(allyTeam, allyPositions, "ally");
  placeAgentsOnBoard(enemyTeam, enemyPositions, "enemy");

  return newBoard;
}
