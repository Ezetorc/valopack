import { Agent } from './Agent'
import { Inventory } from './Inventory'

export interface UserStore {
  credits: number
  setCredits: (newCredits: number) => void
  inventory: Inventory
  setInventory: (newInventory: Inventory) => void
  team: Agent[]
  setTeam: (newTeam: Agent[]) => void
  agentToChange: number | null
  setAgentToChange: (newAgentToChange: number | null) => void
}
