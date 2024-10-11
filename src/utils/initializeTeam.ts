import { defaultAttributes } from '../constants/general'
import Agent from '../interfaces/Agent'
import Attributes from '../interfaces/Attributes'

const initializeAgentWithAttributes = (agent: Agent): Agent & Attributes => {
  return {
    ...agent,
    ...defaultAttributes
  }
}

export default function initializeTeam (team: Agent[]): (Agent & Attributes)[] {
  return team.map(initializeAgentWithAttributes)
}
