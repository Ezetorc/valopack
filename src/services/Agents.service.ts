import { Agent } from './../models/Agent'
import { Pack } from '../pages/Shop/models/Pack'
import { Product } from '../pages/Shop/models/Product'
import { Role } from '../models/Role'
import { getShuffled } from '../utilities/getShuffled'
import { Inventory } from '../models/Inventory'
import { Card } from '../models/Card'
import { agents } from '../constants/agents'

export class Agents {
  static async getAll (): Promise<Agent[]> {
    return [...agents]
  }

  static async getByRole (role: Role, amount: number): Promise<Agent[]> {
    const agentsCopy: Agent[] = await this.getAll()
    const filteredAgents: Agent[] = agentsCopy.filter(
      (agent: Agent) => agent.role === role
    )
    const finalAgents: Agent[] = getShuffled(filteredAgents).slice(0, amount)
    return finalAgents
  }

  static async getMixed (amount: number): Promise<Agent[]> {
    const agentsCopy: Agent[] = await this.getAll()
    const finalAgents: Agent[] = getShuffled(agentsCopy).slice(0, amount)
    return finalAgents
  }

  static async getNew (inventory: Inventory, amount: number): Promise<Agent[]> {
    const agentsCopy: Agent[] = await this.getAll()
    const filteredAgents: Agent[] = agentsCopy.filter(
      agent => !inventory.hasCard(agent.name)
    )
    const finalAgents: Agent[] = getShuffled(filteredAgents).slice(0, amount)
    return finalAgents
  }

  static async getByName (names: readonly string[]): Promise<Agent[]> {
    const nameSet: Set<string> = new Set(names)
    const agents: Agent[] = await this.getAll()
    const filteredAgents: Agent[] = agents.filter(agent =>
      nameSet.has(agent.name)
    )
    const finalAgents: Agent[] = filteredAgents.slice(0, names.length)

    return finalAgents
  }

  static async purchase (
    product: Product,
    inventory: Inventory
  ): Promise<{
    newAgents: Agent[]
    newInventory: Inventory
  }> {
    const actions: { [key in Pack['type']]: () => Promise<Agent[]> } = {
      mixed: () => this.getMixed(product.cardsAmount),
      new: () => this.getNew(inventory, product.cardsAmount),
      duelist: () => this.getByRole('duelist', product.cardsAmount),
      initiator: () => this.getByRole('initiator', product.cardsAmount),
      controller: () => this.getByRole('controller', product.cardsAmount),
      sentinel: () => this.getByRole('sentinel', product.cardsAmount)
    }

    const newAgents: Agent[] = await actions[product.pack.type]()
    const newInventory: Inventory = inventory
    const newCards: Card[] = this.getCardsFromAgents(newAgents)

    newInventory.addCards(newCards)

    return { newAgents, newInventory }
  }

  static getCardsFromAgents (agents: Agent[], isInTeam?: boolean): Card[] {
    return agents.map(agent => ({
      image: agent.portrait,
      name: agent.name,
      role: agent.role,
      level: 1,
      icon: agent.icon,
      abilities: agent.abilities,
      isInTeam: isInTeam ?? false
    }))
  }
}
