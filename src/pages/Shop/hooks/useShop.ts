import { useContext } from 'react'
import { useUser } from '../../../hooks/useUser.ts'
import { Product } from '../../../models/Product.ts'
import { Agent } from '../../../models/Agent.ts'
import { ShopContextType } from '../../../models/ShopContextType.ts'
import { ShopContext } from '../contexts/ShopContext.tsx'
import { Agents } from '../../../services/Agents.service.ts'
import { levelMultiplier } from '../../../valopack.config.ts'

export function useShop () {
  const context: ShopContextType | undefined = useContext(ShopContext)
  if (!context) throw new Error('Context must be used with a Provider')

  const { setOwnedAgents, setOwnedProduct, setSelectedProduct } = context
  const { setCredits, setInventory, inventory } = useUser()

  const buy = async (product: Product): Promise<void> => {
    try {
      const { newAgents, newInventory } = await Agents.purchase(
        product,
        inventory
      )
      setOwnedProduct(product)
      setSelectedProduct(null)
      setCredits(prevCredits => prevCredits - product.price)
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

  return { ...context, buy, getNewInventory }
}
