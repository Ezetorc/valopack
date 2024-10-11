import { useContext } from 'react'
import useUser from './useUser'
import Product from '../interfaces/Product'
import Agent from '../interfaces/Agent'
import getAgents from '../utils/getAgents'
import { levelMultiplier } from '../constants/general'
import ShopContextType from '../interfaces/ShopContextType'
import { ShopContext } from '../contexts/ShopContext'
import duelistPackImage from '../assets/images/packs/duelist_pack.webp'
import controllerPackImage from '../assets/images/packs/controller_pack.webp'
import initiatorPackImage from '../assets/images/packs/initiator_pack.webp'
import sentinelPackImage from '../assets/images/packs/sentinel_pack.webp'
import mixedPackImage from '../assets/images/packs/mixed_pack.webp'
import newPackImage from '../assets/images/packs/new_pack.webp'
import useSettings from './useSettings'

import { useMemo } from 'react'

export default function useShop () {
  const context: ShopContextType | undefined = useContext(ShopContext)
  if (!context) throw new Error('Context must be used with a Provider')

  const { setOwnedAgents, setOwnedProduct, setSelectedProduct } = context
  const { setCredits, setInventory, inventory } = useUser()
  const { texts } = useSettings()

  const buy = (product: Product): void => {
    const newAgents: Agent[] = getAgents(
      product.product.type,
      product.amount,
      inventory
    )
    const newInventory: Agent[] = getNewInventory(inventory, newAgents)

    setOwnedProduct(product)
    setSelectedProduct(null)
    setCredits(prevCredits => prevCredits - product.product.price)
    setOwnedAgents(newAgents)
    setInventory(newInventory)
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
        product: {
          type: 'duelist',
          name: texts.duelistPack,
          price: 2000,
          image: duelistPackImage
        },
        color: '#833d25',
        amount: 1
      },
      {
        product: {
          type: 'controller',
          name: texts.controllerPack,
          price: 2000,
          image: controllerPackImage
        },
        color: '#234950',
        amount: 1
      },
      {
        product: {
          type: 'initiator',
          name: texts.initiatorPack,
          price: 2000,
          image: initiatorPackImage
        },
        color: '#1f4531',
        amount: 1
      },
      {
        product: {
          type: 'sentinel',
          name: texts.sentinelPack,
          price: 2000,
          image: sentinelPackImage
        },
        color: '#4a4a4a',
        amount: 1
      },
      {
        product: {
          type: 'new',
          name: texts.newPack,
          price: 5000,
          image: newPackImage
        },
        color: '#7b0707',
        amount: 1
      },
      {
        product: {
          type: 'all',
          name: texts.mixedPack,
          price: 3000,
          image: mixedPackImage
        },
        color: '#70226d',
        amount: 1
      }
    ],
    [texts]
  ) // Se memoriza cuando texts cambia

  return { ...context, buy, getNewInventory, products }
}
