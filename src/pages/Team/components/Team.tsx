import { useEffect, useState } from 'react'
import { useUser } from '../../../hooks/useUser.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { Agent } from '../../../models/Agent.ts'
import { CardSlot } from './CardSlot.tsx'
import { Selector } from './Selector.tsx'
import { backgrounds } from '../../../valopack.config.ts'
import { Agents } from '../../../services/Agents.service.ts'
import './Team.css'

export default function Team () {
  const { team, agentToChange } = useUser()
  const { texts, updateSection } = useSettings()
  const [agents, setAgents] = useState<(Agent | null)[]>([])

  useEffect(
    () => updateSection(texts.team, backgrounds.team, true),
    [updateSection, texts.team]
  )

  useEffect(() => {
    const newAgents = []

    for (let i = 0; i < 5; i++) {
      const agent = team[i]
      if (agent) {
        newAgents.push(agent)
      } else {
        newAgents.push(null)
      }
    }
    
    setAgents(newAgents)
  }, [setAgents, team])

  return (
    <>
      {!agentToChange ? (
        <section className='team'>
          {agents.map((agent, index) => (
            <CardSlot
              key={index}
              index={index}
              card={agent ? Agents.getCardsFromAgents([agent])[0] : null}
            />
          ))}
        </section>
      ) : (
        <Selector />
      )}
    </>
  )
}
