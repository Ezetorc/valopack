import Box from "../interfaces/Box";
import Map from "../interfaces/Map";

export default function getBackgroundColor(box: Box, map: Map) {
  const { x, y } = box.position;

  const isEven = (x + y) % 2 === 0;
  const backgroundColor = isEven ? map.color[0] : map.color[1];

  return backgroundColor;
}
