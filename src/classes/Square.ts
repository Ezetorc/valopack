import { Vector2 } from "../types/Vector2";
import Box from "./Box";

export default class Square {
  public boxes: Box[];
  public position: Vector2;

  constructor({
    position = { x: 0, y: 0 },
    boxes = [],
  }: Partial<Square> = {}) {
    this.position = position;
    this.boxes = boxes;
  }
}
