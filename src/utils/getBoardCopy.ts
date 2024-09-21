import Map from "../interfaces/Map";

export default function getBoardCopy(board: Map): Map {
  return { ...board, grid: [...board.grid] };
}
