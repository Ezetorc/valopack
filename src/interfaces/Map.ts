import Square from "../classes/Square";

export default interface Map {
  color: [`#${string}`, `#${string}`];
  grid: [
    [Square, Square, Square, Square, Square, Square, Square],
    [Square, Square, Square, Square, Square, Square, Square],
    [Square, Square, Square, Square, Square, Square, Square],
    [Square, Square, Square, Square, Square, Square, Square],
    [Square, Square, Square, Square, Square, Square, Square]
  ];
}
