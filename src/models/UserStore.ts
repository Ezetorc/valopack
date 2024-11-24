import { Inventory } from './Inventory'

export interface UserStore {
  credits: number
  setCredits: (newCredits: number) => void
  inventory: Inventory
  setInventory: (newInventory: Inventory) => void
  selectorVisible: boolean
  setSelectorVisible: (isSelectorVisible: boolean) => void
}
