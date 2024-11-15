import { Agent } from "../../../models/Agent"
import { Product } from "./Product"

export interface ShopStore {
  ownedProduct: Product | null
  setOwnedProduct: (newProduct: Product | null) => void
  selectedProduct: Product | null
  setSelectedProduct: (newProduct: Product | null) => void
  ownedAgents: Agent[]
  setOwnedAgents: (newAgents: Agent[]) => void
}
