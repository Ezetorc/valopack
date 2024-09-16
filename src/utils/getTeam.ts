import { Filter } from "./../types/Filter";
import { agents } from "../constants/agents";
import Agent from "../interfaces/Agent";
import getAgents from "./getAgents";
import { Role } from "../types/Role";

const DEFAULT_TEAM_ROLES: Role[] = [
  "controller",
  "duelist",
  "sentinel",
  "duelist",
  "initiator",
];

export default function getTeam(agentNames?: string[]): Agent[] {
  if (agentNames) {
    return Object.values(agents).filter((agent) =>
      agentNames.includes(agent.name)
    );
  }

  return DEFAULT_TEAM_ROLES.reduce<Agent[]>((team, role) => {
    const agent = getAgents(role as Filter, 1)[0];
    if (agent) team.push(agent);
    return team;
  }, []);
}
