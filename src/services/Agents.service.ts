import { agents } from '../constants/agents'
import { Agent } from '../models/Agent'
import { Pack } from '../pages/Shop/models/Pack'
import { Product } from '../pages/Shop/models/Product'
import { Role } from '../models/Role'
import { shuffle } from '../utilities/shuffle'
import { levelMultiplier } from '../valopack.config'

export class Agents {
  static async getAll (): Promise<Agent[]> {
    return [...agents]
  }

  static async getByRole (role: Role, amount: number): Promise<Agent[]> {
    const agentsCopy: Agent[] = await this.getAll()
    const filteredAgents = agentsCopy.filter(
      (agent: Agent) => agent.role === role
    )
    shuffle(filteredAgents)
    return filteredAgents.slice(0, amount)
  }

  static async getMixed (amount: number): Promise<Agent[]> {
    const agentsCopy: Agent[] = await this.getAll()
    shuffle(agentsCopy)
    return agentsCopy.slice(0, amount)
  }

  static async getNew (inventory: Agent[], amount: number): Promise<Agent[]> {
    const agentsCopy: Agent[] = await this.getAll()
    const filteredAgents = agentsCopy.filter(
      (agent: Agent) => !inventory.some(card => card.id === agent.id)
    )
    shuffle(filteredAgents)
    return filteredAgents.slice(0, amount)
  }

  static async getByName (names: string[]): Promise<Agent[]> {
    const nameSet: Set<string> = new Set(names)
    const agents: Agent[] = await this.getAll()
    return agents.filter(agent => nameSet.has(agent.name)).slice(0, names.length)
  }

  static async purchase (
    product: Product,
    inventory: Agent[]
  ): Promise<{ newAgents: Agent[]; newInventory: Agent[] }> {
    const actions: { [key in Pack['type']]: () => Promise<Agent[]> } = {
      mixed: () => this.getMixed(product.amount),
      new: () => this.getNew(inventory, product.amount),
      duelist: () => this.getByRole('duelist', product.amount),
      initiator: () => this.getByRole('initiator', product.amount),
      controller: () => this.getByRole('controller', product.amount),
      sentinel: () => this.getByRole('sentinel', product.amount)
    }

    const newAgents: Agent[] = await actions[product.pack.type]()
    const newInventory: Agent[] = this.getUpdatedInventory(inventory, newAgents)
    return { newAgents, newInventory }
  }

  private static getUpdatedInventory (
    inventory: Agent[],
    newAgents: Agent[]
  ): Agent[] {
    const newInventory: Agent[] = [...inventory]

    for (const newAgent of newAgents) {
      const existingAgentIndex: number = newInventory.findIndex(
        agent => agent.id === newAgent.id
      )

      if (existingAgentIndex !== -1) {
        newInventory[existingAgentIndex].level += levelMultiplier
      } else {
        newInventory.push(newAgent)
      }
    }

    return newInventory
  }
}
