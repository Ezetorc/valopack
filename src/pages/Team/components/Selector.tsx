import { useCallback } from 'react'
import { useUser } from '../../../hooks/useUser.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { Agent } from '../../../models/Agent.ts'
import Card from '../../Shop/components/Card.tsx'
import './Selector.css'
import { sounds } from '../../../constants/sounds.ts'

export function Selector () {
  const { inventory, team, setTeam, agentToChange, setAgentToChange } =
    useUser()
  const { texts } = useSettings()

  const handleClose = () => {
    setAgentToChange(null)
    sounds.click.play()
  }

  const handleClick = useCallback(
    (agent: Agent) => {
      if (agentToChange === null || agentToChange === undefined) return

      sounds.click.play()
      setAgentToChange(null)
      const newTeam = [...team]
      newTeam[agentToChange] = agent
      setTeam(newTeam)
    },
    [setTeam, agentToChange, setAgentToChange, team]
  )

  const filteredInventory: Agent[] = inventory.filter(
    card => !team.some(agent => agent?.id === card.id)
  )

  return (
    <div className='selector'>
      <header className='selector__header'>
        <button onClick={handleClose}>{texts.close}</button>
        <span>
          {filteredInventory.length > 0 ? texts.chooseCard : texts.noCards}
        </span>
      </header>

      {filteredInventory.length > 0 && (
        <div className='selector__cards'>
          {filteredInventory.map((card, index) => (
            <button
              key={index}
              className='selector__card'
              onClick={() => handleClick(card)}
            >
              <Card
                image={card.portrait}
                name={card.name}
                role={card.role}
                level={card.level}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
