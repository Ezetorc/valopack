import { useUser } from '../../../hooks/useUser.ts'
import { Product } from '../models/Product.ts'
import { Agent } from '../../../models/Agent.ts'
import { Agents } from '../../../services/Agents.service.ts'
import { levelMultiplier } from '../../../valopack.config.ts'
import { ShopStore } from '../models/ShopStore.ts'
import { getShopStore } from '../stores/getShopStore.ts'

export function useShop () {
  const shopStore: ShopStore = getShopStore()
  const { setOwnedAgents, setOwnedProduct, setSelectedProduct } = shopStore
  const { setCredits, setInventory, inventory, credits } = useUser()

  const buy = async (product: Product): Promise<void> => {
    try {
      const { newAgents, newInventory } = await Agents.purchase(
        product,
        inventory
      )
      setOwnedProduct(product)
      setSelectedProduct(null)
      setCredits(credits - product.price)
      setOwnedAgents(newAgents)
      setInventory(newInventory)
    } catch (error) {
      console.error('Error purchasing agents:', error)
    }
  }

  function getNewInventory (inventory: Agent[], newAgents: Agent[]): Agent[] {
    const newInventory: Agent[] = [...inventory]

    newAgents.forEach(newAgent => {
      const existingAgentIndex: number = newInventory.findIndex(
        (agent: Agent) => agent.id === newAgent.id
      )

      if (existingAgentIndex !== -1) {
        newInventory[existingAgentIndex].level += levelMultiplier
      } else {
        newInventory.push(newAgent)
      }
    })

    return newInventory
  }

  return { ...shopStore, buy, getNewInventory }
}
