import CardDisplay from '../../../components/CardDisplay.tsx'
import { useSettings } from '../../../hooks/useSettings.ts'
import { CardSlot } from '../../../models/CardSlot.ts'

interface CardSlotDisplayProps {
  cardSlot: CardSlot
  handleClick?: () => void
}

export function CardSlotDisplay ({
  cardSlot,
  handleClick
}: CardSlotDisplayProps) {
  const { texts } = useSettings()

  return (
    <button
      className={`w-[90%] max-w-[300px] aspect-[9/16] flex rounded-[20px] relative overflow-hidden cursor-pointer border-[2px] hover:opacity-80 ${
        cardSlot
          ? 'bg-transparent border-none'
          : 'bg-[#343434] border-[2px] border-[#515151] justify-center items-center font-stroke text-[#9b9b9b] text-[clamp(100px,5vw,200px)]'
      } `}
      onClick={handleClick}
    >
      {cardSlot ? (
        <CardDisplay showLevel={true} card={cardSlot} />
      ) : (
        texts.addCard
      )}
    </button>
  )
}
