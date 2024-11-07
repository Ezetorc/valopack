import { Agent } from './Agent.ts'
import { Product } from './Product.ts'

export interface ShopContextType {
  ownedProduct: Product | null
  setOwnedProduct: React.Dispatch<React.SetStateAction<Product | null>>
  selectedProduct: Product | null
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>
  ownedAgents: Agent[]
  setOwnedAgents: React.Dispatch<React.SetStateAction<Agent[]>>
}
