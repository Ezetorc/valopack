import { create } from 'zustand'
import { Agent } from '../models/Agent'
import { initialCredits, initialAgentsNames } from '../valopack.config'
import { Agents } from '../services/Agents.service'
import { UserStore } from '../models/UserStore'

export const getUserStore = create<UserStore>(set => {
  const initializeAgents = async () => {
    const initialAgents: Agent[] = await Agents.getByName(initialAgentsNames)
    set({ team: initialAgents, inventory: initialAgents })
  }

  initializeAgents()

  return {
    credits: initialCredits,
    setCredits: newCredits => set({ credits: newCredits }),

    inventory: [],
    setInventory: newInventory => set({ inventory: newInventory }),

    team: [],
    setTeam: newTeam => set({ team: newTeam }),

    agentToChange: null,
    setAgentToChange: newAgentToChange =>
      set({ agentToChange: newAgentToChange })
  }
})
