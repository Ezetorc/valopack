import { levelMultiplier } from '../valopack.config'
import { Agent } from './Agent'

export class Inventory {
  constructor (agents?: Agent[]) {
    this.agents = agents ?? []
  }

  public agents: Agent[]

  public addAgent (agent: Agent) {
    this.agents.push(agent)
  }

  public getAgentByIndex (index: number) {
    return this.agents[index]
  }

  public hasAgent (agentId: number) {
    return this.agents.some(agent => agent.id === agentId)
  }

  public getAgentsNotInTeam (team: Agent[]) {
    return this.agents.filter(
      agent => !team.some(teamAgent => teamAgent?.id === agent.id)
    )
  }

  public update (newAgents: Agent[]) {
    for (const newAgent of newAgents) {
      const agentIndex = this.agents.findIndex(
        agent => agent.id === newAgent.id
      )

      if (agentIndex !== -1) {
        this.getAgentByIndex(agentIndex).level += levelMultiplier
      } else {
        this.addAgent(newAgent)
      }
    }
  }
}
