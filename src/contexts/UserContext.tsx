import { createContext, ReactNode, useEffect, useState } from 'react'
import {Agent} from '../models/Agent'
import UserContextType from '../models/UserContextType'
import { initialAgentsNames } from '../constants/initialAgentsNames'
import { AgentsService } from '../services/AgentsService'

export const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserContextProvider ({ children }: { children: ReactNode }) {
  const [credits, setCredits] = useState<number>(10000)
  const [inventory, setInventory] = useState<Agent[]>([])
  const [agentToChange, setAgentToChange] = useState<number | null>(null)
  const [team, setTeam] = useState<Agent[]>([])

  useEffect(() => {
    const setTeamAndInventory = async () => {
      const initialAgents: Agent[] = await AgentsService.getTeam(initialAgentsNames)
      setTeam(initialAgents)
      setInventory(initialAgents)
    }

    setTeamAndInventory()
  }, [])

  return (
    <UserContext.Provider
      value={{
        credits,
        setCredits,
        inventory,
        setInventory,
        team,
        setTeam,
        agentToChange,
        setAgentToChange
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
