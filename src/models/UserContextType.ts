import { Agent } from './Agent.ts'

export interface UserContextType {
  credits: number
  setCredits: React.Dispatch<React.SetStateAction<number>>
  inventory: Agent[]
  setInventory: React.Dispatch<React.SetStateAction<Agent[]>>
  team: Agent[]
  setTeam: React.Dispatch<React.SetStateAction<Agent[]>>
  agentToChange: number | null
  setAgentToChange: React.Dispatch<React.SetStateAction<number | null>>
}
