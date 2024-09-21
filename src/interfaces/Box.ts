import { BoxType } from "../types/BoxType";
import { Vector2 } from "../types/Vector2";

export default interface Box {
  type: BoxType;
  position: Vector2;
  code: string;
}
