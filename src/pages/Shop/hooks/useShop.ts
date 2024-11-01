import { useContext } from 'react'
import { useUser } from '../../../hooks/useUser'
import { Product } from '../../../models/Product'
import { Agent } from '../../../models/Agent'
import { levelMultiplier } from '../../../constants/general'
import ShopContextType from '../../../models/ShopContextType'
import { ShopContext } from '../contexts/ShopContext'
import duelistPackImage from '../assets/images/duelist_pack.webp'
import controllerPackImage from '../assets/images/controller_pack.webp'
import initiatorPackImage from '../assets/images/initiator_pack.webp'
import sentinelPackImage from '../assets/images/sentinel_pack.webp'
import mixedPackImage from '../assets/images/mixed_pack.webp'
import newPackImage from '../assets/images/new_pack.webp'
import { useSettings } from '../../../hooks/useSettings'
import { useMemo } from 'react'
import { AgentsService } from '../../../services/AgentsService'

export default function useShop () {
  const context: ShopContextType | undefined = useContext(ShopContext)
  if (!context) throw new Error('Context must be used with a Provider')

  const { setOwnedAgents, setOwnedProduct, setSelectedProduct } = context
  const { setCredits, setInventory, inventory } = useUser()
  const { texts } = useSettings()

  const buy = async (product: Product): Promise<void> => {
    try {
      const { newAgents, newInventory } = await AgentsService.purchase(
        product,
        inventory
      )
      setOwnedProduct(product)
      setSelectedProduct(null)
      setCredits(prevCredits => prevCredits - product.pack.price)
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

  const products: Product[] = useMemo(
    () => [
      {
        pack: {
          type: 'duelist',
          name: texts.duelistPack,
          price: 2000,
          image: duelistPackImage
        },
        color: '#833d25',
        amount: 1
      },
      {
        pack: {
          type: 'controller',
          name: texts.controllerPack,
          price: 2000,
          image: controllerPackImage
        },
        color: '#234950',
        amount: 1
      },
      {
        pack: {
          type: 'initiator',
          name: texts.initiatorPack,
          price: 2000,
          image: initiatorPackImage
        },
        color: '#1f4531',
        amount: 1
      },
      {
        pack: {
          type: 'sentinel',
          name: texts.sentinelPack,
          price: 2000,
          image: sentinelPackImage
        },
        color: '#4a4a4a',
        amount: 1
      },
      {
        pack: {
          type: 'new',
          name: texts.newPack,
          price: 5000,
          image: newPackImage
        },
        color: '#7b0707',
        amount: 1
      },
      {
        pack: {
          type: 'mixed',
          name: texts.mixedPack,
          price: 3000,
          image: mixedPackImage
        },
        color: '#70226d',
        amount: 1
      }
    ],
    [texts]
  )

  return { ...context, buy, getNewInventory, products }
}
