import Player from "../classes/Player";
import Square from "../classes/Square";
import { allyPositions, enemyPositions } from "../constants/general";
import Agent from "../interfaces/Agent";
import Map from "../interfaces/Map";
import { Team } from "../types/Team";
import { Vector2 } from "../types/Vector2";

export default function initializeBoard(
  board: Map,
  allyTeam: Agent[],
  enemyTeam: Agent[]
): Map {
  const newBoard: Map = JSON.parse(JSON.stringify(board));

  const placeAgentsOnBoard = (
    agents: Agent[],
    positions: Vector2[],
    team: Team
  ) => {
    positions.forEach((position, index) => {
      const agent: Agent = agents[index];
      const square: Square = newBoard.grid[position.y][position.x];

      const newPlayer = new Player({
        agent: { ...agent },
        team: team,
        position: position,
      });

      square.boxes = [newPlayer];
    });
  };

  placeAgentsOnBoard(allyTeam, allyPositions, "ally");
  placeAgentsOnBoard(enemyTeam, enemyPositions, "enemy");

  return newBoard;
}
