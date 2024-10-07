import { Filter } from "./../types/Filter";
import { agents } from "../constants/agents";
import Agent from "../interfaces/Agent";
import getAgents from "./getAgents";
import { defaultTeamRoles } from "../constants/general";

export default function getTeam(agentNames?: string[]): Agent[] {
  if (agentNames) {
    const agentsValues: Agent[] = Object.values(agents);
    return agentsValues.filter((agent) => agentNames.includes(agent.name));
  }

  return defaultTeamRoles.reduce<Agent[]>((team, role) => {
    const agent: Agent = getAgents(role as Filter, 1)[0];

    if (agent) {
      team.push(agent);
    }

    return team;
  }, []);
}
