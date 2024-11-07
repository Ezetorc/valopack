import { sounds } from '../../../constants/sounds.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { useUser } from '../../../hooks/useUser.ts'
import { Agent } from '../../../models/Agent.ts'
import Card from '../../Shop/components/Card.tsx'
import './Slot.css'

interface SlotProps {
  agent: Agent | null
  index: number
}

export function Slot ({ agent, index }: SlotProps) {
  const { setAgentToChange } = useUser()
  const { texts } = useSettings()

  const handleClick = () => {
    setAgentToChange(index)
    sounds.click.play()
  }

  return agent ? (
    <button className='slot slot-card' onClick={handleClick}>
      <Card
        role={agent.role}
        name={agent.name}
        image={agent.portrait}
        level={agent.level}
      />
    </button>
  ) : (
    <button className='slot slot-null' onClick={handleClick}>
      {texts.addCard}
    </button>
  )
}
