import { createContext, ReactNode, useState } from "react";
import Map from "../interfaces/Map";
import { maps } from "../constants/maps";
import { Team } from "../types/Team";
import { Action } from "../types/Action";
import Effect from "../interfaces/Effect";
import Box from "../classes/Box";
import GameContextType from "../interfaces/GameContextType";
import Square from "../classes/Square";

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export function GameContextProvider({ children }: { children: ReactNode }) {
  const [turn, setTurn] = useState<Team>("ally");
  const [map, setMap] = useState<Map>(maps.bind);
  const [selectedBox, setSelectedBox] = useState<Box | null>(null);
  const [targetBox, setTargetBox] = useState<Box | null>(null);
  const [action, setAction] = useState<Action | null>(null);
  const [board, setBoard] = useState<Map>(map);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [effects, setEffects] = useState<Effect[]>([]);

  return (
    <GameContext.Provider
      value={{
        board,
        setBoard,
        map,
        setMap,
        selectedBox,
        setSelectedBox,
        turn,
        setTurn,
        action,
        setAction,
        targetBox,
        setTargetBox,
        effects,
        setEffects,
        selectedSquare,
        setSelectedSquare,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
