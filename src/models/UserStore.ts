import { Card } from './Card'
import { FiveOrLessArray } from './FiveOrLessArray'
import { Inventory } from './Inventory'

export interface UserStore {
  credits: number
  setCredits: (newCredits: number) => void
  inventory: Inventory
  setInventory: (newInventory: Inventory) => void
  team: FiveOrLessArray<Card>
  setTeam: (newTeam: FiveOrLessArray<Card>) => void
  cardToChange: number | null
  setCardToChange: (newAgentToChange: number | null) => void
}
