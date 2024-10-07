import Box from "../classes/Box";
import Square from "../classes/Square";
import { Action } from "../types/Action";
import { Team } from "../types/Team";
import Effect from "./Effect";
import Map from "./Map";

export default interface GameContextType {
  board: Map;
  setBoard: React.Dispatch<React.SetStateAction<Map>>;
  map: Map;
  setMap: React.Dispatch<React.SetStateAction<Map>>;
  selectedBox: Box | null;
  setSelectedBox: React.Dispatch<React.SetStateAction<Box | null>>;
  targetBox: Box | null;
  setTargetBox: React.Dispatch<React.SetStateAction<Box | null>>;
  turn: Team;
  setTurn: React.Dispatch<React.SetStateAction<Team>>;
  action: Action | null;
  setAction: React.Dispatch<React.SetStateAction<Action | null>>;
  effects: Effect[];
  setEffects: React.Dispatch<React.SetStateAction<Effect[]>>;
  selectedSquare: Square | null;
  setSelectedSquare: React.Dispatch<React.SetStateAction<Square | null>>;
}
