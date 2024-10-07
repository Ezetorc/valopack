import { Vector2 } from "../types/Vector2";

export default function getDistance(pos1: Vector2, pos2: Vector2): number {
  return Math.max(Math.abs(pos2.x - pos1.x), Math.abs(pos2.y - pos1.y));
}
