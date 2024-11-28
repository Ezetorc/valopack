import { useUser } from '../../../hooks/useUser.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import CardDisplay from '../../../components/CardDisplay.tsx'
import { Card } from '../../../models/Card.ts'
import { Inventory } from '../../../models/Inventory.ts'
import { CardSlot } from '../../../models/CardSlot.ts'
import { clickAudio } from '../../../constants/audios.ts'
import { CloseButton } from '../../../components/CloseButton.tsx'

interface TeamSelectorProps {
  cardSlotToChange: CardSlot
}

export function TeamSelector ({ cardSlotToChange }: TeamSelectorProps) {
  const { texts, playAudio } = useSettings()
  const { inventory, setInventory, selectorVisible, setSelectorVisible } =
    useUser()
  const cardsNotInTeam: Card[] = inventory.getCardsNotInTeam()
  if (!selectorVisible) return

  const handleClose = () => {
    setSelectorVisible(false)
    playAudio(clickAudio)
  }

  const handleClick = (clickedCard: Card) => {
    playAudio(clickAudio)
    setSelectorVisible(false)

    const newInventory: Inventory = new Inventory([...inventory.cards])
    const cardToModify: Card | undefined = newInventory.getCardByName(
      clickedCard.name
    )

    if (cardToModify) {
      cardToModify.isInTeam = true
    }

    if (cardSlotToChange) {
      const previousCard = newInventory.getCardByName(cardSlotToChange.name)
      if (previousCard) {
        previousCard.isInTeam = false
      }
    }

    setInventory(newInventory)
  }

  return (
    <div className='absolute w-[100vw] min-h-[100dvh] z-[1000]'>
      <header className='bg-v_black border-b-[1px] border-[#fff] w-full h-[150px] grid grid-cols-[1fr_8fr] justify-items-center items-center sticky z-[200] top-0'>
        <CloseButton onClose={handleClose} className='ml-[10%] min-w-[150px]' />
        <span className='text-[clamp(60px,5vw,70px)] text-center'>
          {cardsNotInTeam.length > 0 ? texts.chooseCard : texts.noCards}
        </span>
      </header>

      {cardsNotInTeam.length > 0 && (
        <div className='grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] justify-items-center w-[100vw] min-h-full'>
          {cardsNotInTeam.map((card, index) => (
            <button
              key={index}
              className='w-full max-w-[300px] min-w-[200px] aspect-[9/16] rounded-[20px] relative overflow-hidden cursor-pointer mb-[5%] bg-transparent hover:opacity-80'
              onClick={() => handleClick(card)}
            >
              <CardDisplay card={card} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
