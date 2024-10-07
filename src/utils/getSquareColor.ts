import Square from "../classes/Square";
import Map from "../interfaces/Map";

export default function getSquareColor(square: Square, map: Map): string {
  const { x, y } = square.position;
  const isEven: boolean = (x + y) % 2 === 0;
  const squareColor: string = isEven ? map.color[0] : map.color[1];

  return squareColor;
}
