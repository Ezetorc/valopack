import { create } from 'zustand'
import { ShopStore } from '../models/ShopStore'

export const getShopStore = create<ShopStore>((set, get) => ({
  ownedProduct: null,
  getOwnedProduct: () => get().ownedProduct,
  setOwnedProduct: newOwnedProduct => set({ ownedProduct: newOwnedProduct }),

  selectedProduct: null,
  getSelectedProduct: () => get().selectedProduct,
  setSelectedProduct: newSelectedProduct =>
    set({ selectedProduct: newSelectedProduct }),

  ownedCards: [],
  getOwnedCards: () => get().ownedCards,
  setOwnedCards: newOwnedCards => set({ ownedCards: newOwnedCards })
}))
