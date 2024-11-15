import { Agent } from './Agent'

export interface UserStore {
  credits: number
  setCredits: (newCredits: number) => void
  inventory: Agent[]
  setInventory: (newInventory: Agent[]) => void
  team: Agent[]
  setTeam: (newTeam: Agent[]) => void
  agentToChange: number | null
  setAgentToChange: (newAgentToChange: number | null) => void
}
