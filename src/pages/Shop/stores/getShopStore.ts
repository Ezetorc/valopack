import { create } from 'zustand'
import { ShopStore } from '../models/ShopStore'

export const getShopStore = create<ShopStore>(set => ({
  ownedProduct: null,
  setOwnedProduct: newOwnedProduct => set({ ownedProduct: newOwnedProduct }),

  selectedProduct: null,
  setSelectedProduct: newSelectedProduct =>
    set({ selectedProduct: newSelectedProduct }),

  ownedAgents: [],
  setOwnedAgents: newOwnedAgents => set({ ownedAgents: newOwnedAgents })
}))
