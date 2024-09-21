import React, { createContext, ReactNode, useState } from "react";
import Map from "../interfaces/Map";
import { maps } from "../constants/maps";
import { Team } from "../types/Team";
import { Action } from "../types/Action";
import Box from "../interfaces/Box";
import Effect from "../interfaces/Effect";

interface GameContextType {
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
}

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
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
