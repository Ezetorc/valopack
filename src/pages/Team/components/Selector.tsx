import { useCallback } from 'react'
import { useUser } from '../../../hooks/useUser.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { Agent } from '../../../models/Agent.ts'
import { sounds } from '../../../constants/sounds.ts'
import { Agents } from '../../../services/Agents.service.ts'
import CardDisplay from '../../../components/CardDisplay.tsx'
import './Selector.css'

export function Selector () {
  const { texts } = useSettings()
  const { inventory, team, setTeam, agentToChange, setAgentToChange } =
    useUser()
  const filteredAgents = inventory.getAgentsNotInTeam(team)

  const handleClose = () => {
    setAgentToChange(null)
    sounds.click.play()
  }

  const handleClick = useCallback(
    (agent: Agent) => {
      if (!agentToChange) return

      sounds.click.play()
      setAgentToChange(null)
      const newTeam = [...team]
      newTeam[agentToChange] = agent
      setTeam(newTeam)
    },
    [setTeam, agentToChange, setAgentToChange, team]
  )

  const Header = () => (
    <header className='selector__header'>
      <button onClick={handleClose}>{texts.close}</button>
      <span>
        {filteredAgents.length > 0 ? texts.chooseCard : texts.noCards}
      </span>
    </header>
  )

  const Cards = () => (
    <div className='selector__cards'>
      {filteredAgents.map((agent, index) => (
        <button
          key={index}
          className='selector__card'
          onClick={() => handleClick(agent)}
        >
          <CardDisplay card={Agents.getCardsFromAgents([agent])[0]} />
        </button>
      ))}
    </div>
  )

  return (
    <div className='selector'>
      <Header />
      {filteredAgents.length > 0 && <Cards />}
    </div>
  )
}
