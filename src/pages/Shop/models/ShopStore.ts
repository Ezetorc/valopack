import { Card } from '../../../models/Card'
import { Product } from './Product'

export interface ShopStore {
  ownedProduct: Product | null
  getOwnedProduct: () => Product | null
  setOwnedProduct: (newProduct: Product | null) => void

  selectedProduct: Product | null
  getSelectedProduct: () => Product | null
  setSelectedProduct: (newProduct: Product | null) => void

  ownedCards: Card[]
  getOwnedCards: () => Card[]
  setOwnedCards: (newCards: Card[]) => void
}
