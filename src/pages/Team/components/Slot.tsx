import sounds from '../../../constants/sounds'
import {useSettings} from '../../../hooks/useSettings'
import {useUser} from '../../../hooks/useUser'
import {Agent} from '../../../models/Agent'
import Card from '../../Shop/components/Card'
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
