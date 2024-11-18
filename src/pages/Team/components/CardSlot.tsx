import CardDisplay from '../../../components/CardDisplay.tsx'
import { sounds } from '../../../constants/sounds.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { useUser } from '../../../hooks/useUser.ts'
import { Card } from '../../../models/Card.ts'

interface CardSlotProps {
  card: Card | null
  index: number
}

export function CardSlot ({ card, index }: CardSlotProps) {
  const { setCardToChange } = useUser()
  const { texts } = useSettings()

  const handleClick = () => {
    setCardToChange(index)
    sounds.click.play()
  }

  return (
    <button
      className={`w-[90%] max-w-[300px] aspect-[9/16] flex ${
        card
          ? 'bg-transparent border-none'
          : 'bg-[#343434] border-[2px] border-[#515151] justify-center items-center font-stroke text-[#9b9b9b] text-[clamp(100px,5vw,200px)]'
      } rounded-[20px] relative overflow-hidden cursor-pointer transition-transform hover:translate-y-[-5%]`}
      onClick={handleClick}
    >
      {card ? <CardDisplay card={card} /> : texts.addCard}
    </button>
  )
}
