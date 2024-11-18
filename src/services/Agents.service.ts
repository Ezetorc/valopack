import { agents } from '../constants/agents'
import { Agent } from '../models/Agent'
import { Pack } from '../pages/Shop/models/Pack'
import { Product } from '../pages/Shop/models/Product'
import { Role } from '../models/Role'
import { getShuffled } from '../utilities/getShuffled'
import { Inventory } from '../models/Inventory'
import { Card } from '../models/Card'

export class Agents {
  static async getAll () {
    return [...agents]
  }

  static async getByRole (role: Role, amount: number) {
    const agentsCopy = await this.getAll()
    const filteredAgents = agentsCopy.filter(
      (agent: Agent) => agent.role === role
    )
    return getShuffled(filteredAgents).slice(0, amount)
  }

  static async getMixed (amount: number) {
    const agentsCopy = await this.getAll()
    return getShuffled(agentsCopy).slice(0, amount)
  }

  static async getNew (inventory: Inventory, amount: number) {
    const agentsCopy = await this.getAll()
    const filteredAgents = agentsCopy.filter(
      agent => !inventory.hasCard(agent.name)
    )
    return getShuffled(filteredAgents).slice(0, amount)
  }

  static async getByName (names: string[]) {
    const nameSet = new Set(names)
    const agents = await this.getAll()
    return agents
      .filter(agent => nameSet.has(agent.name))
      .slice(0, names.length)
  }

  static async purchase (product: Product, inventory: Inventory) {
    const actions: { [key in Pack['type']]: () => Promise<Agent[]> } = {
      mixed: () => this.getMixed(product.cardsAmount),
      new: () => this.getNew(inventory, product.cardsAmount),
      duelist: () => this.getByRole('duelist', product.cardsAmount),
      initiator: () => this.getByRole('initiator', product.cardsAmount),
      controller: () => this.getByRole('controller', product.cardsAmount),
      sentinel: () => this.getByRole('sentinel', product.cardsAmount)
    }

    const newAgents = await actions[product.pack.type]()
    const newInventory = inventory
    newInventory.addCards(this.getCardsFromAgents(newAgents))
    return { newAgents, newInventory }
  }

  static getCardsFromAgents (agents: Agent[]): Card[] {
    return agents.map(agent => ({
      image: agent.portrait,
      name: agent.name,
      role: agent.role,
      level: 1,
      icon: agent.icon,
      abilities: agent.abilities
    }))
  }
}
