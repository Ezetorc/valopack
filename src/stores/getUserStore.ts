import { create } from 'zustand'
import { initialCredits, initialAgentsNames } from '../valopack.config'
import { Agents } from '../services/Agents.service'
import { UserStore } from '../models/UserStore'
import { Inventory } from '../models/Inventory'
import { FiveOrLessArray } from '../models/FiveOrLessArray'
import { Card } from '../models/Card'

export const getUserStore = create<UserStore>()(set => {
  const initializeAgents = async () => {
    const initialAgents = await Agents.getByName(initialAgentsNames)
    const initialCards = Agents.getCardsFromAgents(initialAgents) as FiveOrLessArray<Card>
    const initialInventory = new Inventory(initialCards)
    set({ team: initialCards, inventory: initialInventory })
  }

  initializeAgents()

  return {
    credits: initialCredits,
    setCredits: newCredits => set({ credits: newCredits }),

    inventory: new Inventory(),
    setInventory: newInventory => set({ inventory: newInventory }),

    team: [],
    setTeam: newTeam => set({ team: newTeam }),

    cardToChange: null,
    setCardToChange: newCardToChange => set({ cardToChange: newCardToChange })
  }
})
