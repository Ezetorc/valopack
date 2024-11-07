import { useEffect, useState } from 'react'
import { useUser } from '../../../hooks/useUser.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { Agent } from '../../../models/Agent.ts'
import './Team.css'
import { Slot } from './Slot.tsx'
import { Selector } from './Selector.tsx'
import { backgrounds } from '../../../valopack.config.ts'

export default function Team () {
  const { team, agentToChange } = useUser()
  const { texts, updateSection } = useSettings()
  const [agents, setAgents] = useState<(Agent | null)[]>([])

  const isAgentToChangeTrue: boolean =
    agentToChange !== null && agentToChange !== undefined

  useEffect(
    () => updateSection(texts.team, backgrounds.team, true),
    [updateSection, texts.team]
  )

  useEffect(() => {
    const newAgents: (Agent | null)[] = getNewAgents(team)
    setAgents(newAgents)
  }, [setAgents, team])

  return (
    <>
      {!isAgentToChangeTrue ? (
        <section className='team'>
          {agents.map((agent, index) => (
            <Slot key={index} index={index} agent={agent} />
          ))}
        </section>
      ) : (
        <Selector />
      )}
    </>
  )
}

function getNewAgents (team: (Agent | null)[]) {
  const newAgents: (Agent | null)[] = []
  for (let i = 0; i < 5; i++) {
    const agent = team[i]

    if (agent) {
      newAgents.push(agent)
    } else {
      newAgents.push(null)
    }
  }

  return newAgents
}
