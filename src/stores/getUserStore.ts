import { create } from 'zustand'
import { initialCardsNames, initialCredits } from '../valopack.config'
import { Agents } from '../services/Agents.service'
import { UserStore } from '../models/UserStore'
import { Inventory } from '../models/Inventory'
import { Card } from '../models/Card'
import { Agent } from '../models/Agent'

export const getUserStore = create<UserStore>()((set, get) => {
  const initializeAgents = async () => {
    const initialAgents: Agent[] = await Agents.getByName(initialCardsNames)
    const initialCards: Card[] = Agents.getCardsFromAgents(initialAgents, true)
    const initialInventory: Inventory = new Inventory(initialCards)
    set({ inventory: initialInventory })
  }

  initializeAgents()

  return {
    credits: initialCredits,
    getCredits: () => get().credits,
    setCredits: newCredits => set({ credits: newCredits }),

    inventory: new Inventory(),
    getInventory: () => get().inventory,
    setInventory: newInventory => set({ inventory: newInventory }),

    selectorVisible: false,
    getSelectorVisible: () => get().selectorVisible,
    setSelectorVisible: isSelectorVisible =>
      set({ selectorVisible: isSelectorVisible })
  }
})
