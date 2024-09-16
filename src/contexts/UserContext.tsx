import { createContext, ReactNode, useState } from "react";
import Agent from "../interfaces/Agent";
import { initialTeam } from "../constants/initialTeam";
import UserContextType from "../interfaces/UserContextType";

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [credits, setCredits] = useState<number>(10000);
  const [inventory, setInventory] = useState<Agent[]>(initialTeam);
  const [agentToChange, setAgentToChange] = useState<number | null>(null);
  const [team, setTeam] = useState<Agent[]>(initialTeam);

  return (
    <UserContext.Provider
      value={{
        credits,
        setCredits,
        inventory,
        setInventory,
        team,
        setTeam,
        agentToChange,
        setAgentToChange,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
