import Map from "../interfaces/Map";
import { BoxType } from "../types/BoxType";
import { Team } from "../types/Team";
import { Vector2 } from "../types/Vector2";
import getDistance from "./getDistance";
import Box from "../classes/Box";
import Square from "../classes/Square";
import Player from "../classes/Player";

export default function getInRange<T extends Box>(
  board: Map,
  boxTypes: BoxType[] | "all",
  position: Vector2,
  range: number,
  team: Team | "any" = "any"
): Box[] {
  const finalRange: number = range - 1;
  const boxesInRange: Box[] = [];
  const { x, y } = position;
  const { grid } = board;

  for (let i = -finalRange; i <= finalRange; i++) {
    for (let j = -finalRange; j <= finalRange; j++) {
      const neighborX: number = x + i;
      const neighborY: number = y + j;
      const neighborPosition: Vector2 = { x: neighborX, y: neighborY };
      const distance: number = getDistance(position, neighborPosition);

      if (
        distance <= finalRange &&
        neighborY >= 0 &&
        neighborY < grid.length &&
        neighborX >= 0 &&
        neighborX < grid[0].length
      ) {
        const neighborSquare: Square = grid[neighborY][neighborX];
        for (const neighborBox of neighborSquare.boxes) {
          if (boxTypes === "all" || boxTypes.includes(neighborBox.type)) {
            if (neighborBox.type === "player" && team !== "any") {
              const playerBox: Player = neighborBox as Player;
              if (playerBox.team === team) {
                boxesInRange.push(neighborBox as T);
              }
            } else {
              boxesInRange.push(neighborBox as T);
            }
          }
        }
      }
    }
  }

  return boxesInRange;
}
