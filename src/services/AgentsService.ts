import { agents } from '../constants/agents'
import { levelMultiplier } from '../constants/general'
import {Agent} from '../models/Agent'
import {Pack} from '../models/Pack'
import {Product} from '../models/Product'
import { Role } from '../models/Role'

export class AgentsService {
  static async getAll (): Promise<Agent[]> {
    console.log('getAll')
    return [...agents]
  }

  static async getByRole (role: Role, amount: number): Promise<Agent[]> {
    console.log('getByRole')
    const agentsCopy: Agent[] = await this.getAll()
    const filteredAgents = agentsCopy.filter(
      (agent: Agent) => agent.role === role
    )
    return filteredAgents.slice(0, amount)
  }

  static async getMixed (amount: number): Promise<Agent[]> {
    console.log('getMixed')
    const agentsCopy: Agent[] = await this.getAll()
    return agentsCopy.slice(0, amount)
  }

  static async getNew (inventory: Agent[], amount: number): Promise<Agent[]> {
    console.log('getNew')
    const agentsCopy: Agent[] = await this.getAll()
    const filteredAgents = agentsCopy.filter((agent: Agent) => {
      return !inventory.some(card => card.id === agent.id)
    })
    return filteredAgents.slice(0, amount)
  }

  static async getTeam (agentNames?: Agent['name'][]): Promise<Agent[]> {
    const defaultTeamRoles: Role[] = [
      'controller',
      'duelist',
      'duelist',
      'initiator',
      'sentinel'
    ]

    const team: Agent[] = []

    if (agentNames) {
      const agentsValues: Agent[] = Object.values(agents)
      const uniqueAgentNames: Set<string> = new Set(agentNames)

      agentsValues.forEach(agent => {
        if (uniqueAgentNames.has(agent.name) && team.length < 5) {
          team.push(agent)
        }
      })
    }

    while (team.length < 5) {
      for (const role of defaultTeamRoles) {
        if (team.length >= 5) break

        const agent = await this.getByRole(role, 1).then(
          response => response[0]
        )

        if (!agent) continue

        if (!team.some(existingAgent => existingAgent.name === agent.name)) {
          team.push(agent)
        }
      }
    }

    return team
  }

  static async purchase (
    product: Product,
    inventory: Agent[]
  ): Promise<{ newAgents: Agent[]; newInventory: Agent[] }> {
    console.log('purchase')
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
    console.log('getUpdatedInventory')
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
