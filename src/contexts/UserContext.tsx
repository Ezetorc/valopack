import { createContext, ReactNode, useEffect, useState } from 'react'
import { Agent } from '../models/Agent'
import UserContextType from '../models/UserContextType'
import { Agents } from '../services/Agents.service'
import { initialAgentsNames } from '../valopack.config'

export const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserContextProvider ({ children }: { children: ReactNode }) {
  console.log('USERCONTEXT')
  const [credits, setCredits] = useState<number>(10000)
  const [inventory, setInventory] = useState<Agent[]>([])
  const [agentToChange, setAgentToChange] = useState<number | null>(null)
  const [team, setTeam] = useState<Agent[]>([])

  useEffect(() => {
    const setTeamAndInventory = async () => {
      const initialAgents: Agent[] = await Agents.getTeam(
        initialAgentsNames
      )
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
