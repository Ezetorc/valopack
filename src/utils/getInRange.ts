import Box from "../interfaces/Box";
import Map from "../interfaces/Map";
import Player from "../interfaces/Player";
import { BoxType } from "../types/BoxType";
import { Team } from "../types/Team";
import { Vector2 } from "../types/Vector2";
import getDistance from "./getDistance";

export default function getInRange<T extends Box>(
  board: Map,
  boxTypes: BoxType[] | "all",
  position: Vector2,
  range: number,
  team: Team | "any" = "any"
) {
  const finalRange = range - 1;
  const boxesInRange: Box[] = [];
  const { x, y } = position;
  const { grid } = board;

  for (let i = -finalRange; i <= finalRange; i++) {
    for (let j = -finalRange; j <= finalRange; j++) {
      const neighborX = x + i;
      const neighborY = y + j;

      const distance = getDistance(position, { x: neighborX, y: neighborY });

      if (
        distance <= finalRange &&
        neighborY >= 0 &&
        neighborY < grid.length &&
        neighborX >= 0 &&
        neighborX < grid[0].length
      ) {
        const neighborBox = grid[neighborY][neighborX];
        if (boxTypes === "all" || boxTypes.includes(neighborBox.type)) {
          if (neighborBox.type === "player" && team !== "any") {
            const playerBox = neighborBox as Player;
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

  return boxesInRange;
}
