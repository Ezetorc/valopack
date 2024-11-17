import CardDisplay from '../../../components/CardDisplay.tsx'
import { sounds } from '../../../constants/sounds.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { useUser } from '../../../hooks/useUser.ts'
import { Card } from '../../../models/Card.ts'
import './CardSlot.css'

interface CardSlotProps {
  card: Card | null
  index: number
}

export function CardSlot ({ card, index }: CardSlotProps) {
  const { setCardToChange } = useUser()
  const { texts } = useSettings()
  const className = card ? 'slot-card' : 'slot-null'

  const handleClick = () => {
    setCardToChange(index)
    sounds.click.play()
  }

  return (
    <button className={`slot ${className}`} onClick={handleClick}>
      {card ? <CardDisplay card={card} /> : texts.addCard}
    </button>
  )
}
