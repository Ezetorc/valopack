import { agents } from "../constants/agents";
import Agent from "../interfaces/Agent";
import { Filter } from "../types/Filter";
import { Role } from "../types/Role";
import getRandomElements from "./getRandomElements";
import isRole from "./isRole";

export default function getAgents(
  filter: Filter,
  amount: number,
  inventory?: Agent[]
): Agent[] {
  let filteredAgents: Agent[] = [];
  const agentsFilter: Filter = filter;
  const allAgents: Agent[] = getRandomElements(agents);

  if (isRole(agentsFilter)) {
    filteredAgents = filterByRole(allAgents, agentsFilter);
  } else if (agentsFilter === "new" && inventory) {
    filteredAgents = filterByNew(allAgents, inventory);
  } else if (agentsFilter == "all") {
    filteredAgents = allAgents;
  }

  return filteredAgents.slice(0, amount);
}

const filterByRole = (agents: Agent[], role: Role): Agent[] => {
  return agents.filter((agent: Agent) => agent.role === role);
};

const filterByNew = (agents: Agent[], inventory: Agent[]): Agent[] => {
  return agents.filter((agent: Agent) => {
    return !inventory.some((card) => card.id === agent.id);
  });
};
