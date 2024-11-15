import { create } from 'zustand'
import { initialCredits, initialAgentsNames } from '../valopack.config'
import { Agents } from '../services/Agents.service'
import { UserStore } from '../models/UserStore'
import { Inventory } from '../models/Inventory'

export const getUserStore = create<UserStore>()(set => {
  const initializeAgents = async () => {
    const initialAgents = await Agents.getByName(initialAgentsNames)
    const initialInventory = new Inventory(initialAgents)
    set({ team: initialAgents, inventory: initialInventory })
  }

  initializeAgents()

  return {
    credits: initialCredits,
    setCredits: newCredits => set({ credits: newCredits }),

    inventory: new Inventory(),
    setInventory: newInventory => set({ inventory: newInventory }),

    team: [],
    setTeam: newTeam => set({ team: newTeam }),

    agentToChange: null,
    setAgentToChange: newAgentToChange =>
      set({ agentToChange: newAgentToChange })
  }
})
