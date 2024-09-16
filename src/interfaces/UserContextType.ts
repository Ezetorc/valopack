import Agent from "./Agent";

export default interface UserContextType {
  credits: number;
  setCredits: React.Dispatch<React.SetStateAction<number>>;
  inventory: Agent[];
  setInventory: React.Dispatch<React.SetStateAction<Agent[]>>;
  team: Agent[];
  setTeam: React.Dispatch<React.SetStateAction<Agent[]>>;
  agentToChange: number | null;
  setAgentToChange: React.Dispatch<React.SetStateAction<number | null>>;
}
