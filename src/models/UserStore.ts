import { Inventory } from './Inventory'

export interface UserStore {
  credits: number
  getCredits: () => number
  setCredits: (newCredits: number) => void

  inventory: Inventory
  getInventory: () => Inventory
  setInventory: (newInventory: Inventory) => void

  selectorVisible: boolean
  getSelectorVisible: () => boolean
  setSelectorVisible: (isSelectorVisible: boolean) => void
}
