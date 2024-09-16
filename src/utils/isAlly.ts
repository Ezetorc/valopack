import Box from "../interfaces/Box";
import BoxWithAgent from "../interfaces/BoxWithAgent";

export default function isAlly(box: Box) {
  return (box as BoxWithAgent).team === "ally";
}
