import React, { createContext, ReactNode, useState } from "react";
import Map from "../interfaces/Map";
import { maps } from "../constants/maps";
import BoxWithAgent from "../interfaces/BoxWithAgent";
import initializeBoard from "../utils/initializeBoard";
import Agent from "../interfaces/Agent";
import getTeam from "../utils/getTeam";
import { initialTeam } from "../constants/initialTeam";
import { Team } from "../types/Team";

interface GameContextType {
  board: Map;
  setBoard: React.Dispatch<React.SetStateAction<Map>>;
  map: Map;
  setMap: React.Dispatch<React.SetStateAction<Map>>;
  selectedAgent: BoxWithAgent | null;
  setSelectedAgent: React.Dispatch<React.SetStateAction<BoxWithAgent | null>>;
  enemyTeam: Agent[];
  allyTeam: Agent[];
  turn: Team;
  setTurn: React.Dispatch<React.SetStateAction<Team>>;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export function GameContextProvider({ children }: { children: ReactNode }) {
  const [turn, setTurn] = useState<Team>("ally");
  const [map, setMap] = useState<Map>(maps.bind);
  const [selectedAgent, setSelectedAgent] = useState<BoxWithAgent | null>(null);
  const [enemyTeam] = useState<Agent[]>(getTeam());
  const [allyTeam] = useState<Agent[]>(initialTeam);
  const [board, setBoard] = useState<Map>(
    initializeBoard(map, allyTeam, enemyTeam)
  );

  return (
    <GameContext.Provider
      value={{
        board,
        setBoard,
        map,
        setMap,
        selectedAgent,
        setSelectedAgent,
        enemyTeam,
        allyTeam,
        turn,
        setTurn,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
