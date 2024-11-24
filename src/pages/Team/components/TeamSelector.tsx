import { useUser } from '../../../hooks/useUser.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { sounds } from '../../../constants/sounds.ts'
import CardDisplay from '../../../components/CardDisplay.tsx'
import { Card } from '../../../models/Card.ts'
import { Inventory } from '../../../models/Inventory.ts'
import { CardSlot } from '../../../models/CardSlot.ts'

interface TeamSelectorProps {
  cardSlotToChange: CardSlot
}

export function TeamSelector ({ cardSlotToChange }: TeamSelectorProps) {
  const { texts } = useSettings()
  const { inventory, setInventory, selectorVisible, setSelectorVisible } =
    useUser()
  const cardsNotInTeam: Card[] = inventory.getCardsNotInTeam()
  if (!selectorVisible) return

  const handleClose = () => {
    setSelectorVisible(false)
    sounds.click.play()
  }

  const handleClick = (clickedCard: Card) => {
    sounds.click.play()
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
      <header className='bg-[#282828] w-full h-[20%] min-h-[100px] grid grid-cols-[1fr_8fr] justify-items-center items-center sticky z-[200] top-0'>
        <button
          onClick={handleClose}
          className='cursor-pointer bg-v_red_gradient border-v_red text-white text-[clamp(30px,5vw,50px)] font-stroke border-2 border-main ml-[10%] min-w-[150px] aspect-[16/9] hover:border-white'
        >
          {texts.close}
        </button>
        <span className='text-[clamp(60px,5vw,100px)] text-center'>
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
