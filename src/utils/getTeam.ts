import { Filter } from './../types/Filter'
import { agents } from '../constants/agents'
import Agent from '../interfaces/Agent'
import getAgents from './getAgents'
import { defaultTeamRoles } from '../constants/general'

export default function getTeam (agentNames?: string[]): Agent[] {
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

      const agent: Agent = getAgents(role as Filter, 1)[0]

      if (agent) {
        if (!team.some(existingAgent => existingAgent.name === agent.name)) {
          team.push(agent)
        }
      }
    }
  }

  return team
}
