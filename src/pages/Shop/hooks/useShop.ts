import { useUser } from '../../../hooks/useUser.ts'
import { Product } from '../models/Product.ts'
import { Agents } from '../../../services/Agents.service.ts'
import { ShopStore } from '../models/ShopStore.ts'
import { getShopStore } from '../stores/getShopStore.ts'

export function useShop () {
  const shopStore: ShopStore = getShopStore()
  const { setOwnedCards, setOwnedProduct, setSelectedProduct } = shopStore
  const { setCredits, setInventory, inventory, credits } = useUser()

  const buy = async (product: Product): Promise<void> => {
    if (!inventory) return
    try {
      const { newAgents, newInventory } = await Agents.purchase(
        product,
        inventory
      )
      setOwnedProduct(product)
      setSelectedProduct(null)
      setCredits(credits - product.price)
      setOwnedCards(Agents.getCardsFromAgents(newAgents))
      setInventory(newInventory)
    } catch (error) {
      console.error('Error purchasing agents:', error)
    }
  }

  return { ...shopStore, buy }
}
