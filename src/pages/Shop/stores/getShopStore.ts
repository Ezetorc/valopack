import { create } from 'zustand'
import { ShopStore } from '../models/ShopStore'

export const getShopStore = create<ShopStore>(set => ({
  ownedProduct: null,
  setOwnedProduct: newOwnedProduct => set({ ownedProduct: newOwnedProduct }),

  selectedProduct: null,
  setSelectedProduct: newSelectedProduct =>
    set({ selectedProduct: newSelectedProduct }),

  ownedCards: [],
  setOwnedCards: newOwnedCards => set({ ownedCards: newOwnedCards })
}))
