import { useCallback } from 'react'
import { useUser } from '../../../hooks/useUser.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { sounds } from '../../../constants/sounds.ts'
import CardDisplay from '../../../components/CardDisplay.tsx'
import { FiveOrLessArray } from '../../../models/FiveOrLessArray.ts'
import { Card } from '../../../models/Card.ts'

export function Selector() {
  const { texts } = useSettings()
  const { inventory, team, setTeam, cardToChange, setCardToChange } = useUser()
  const filteredCards = inventory.getCardsNotInTeam(team)

  const handleClose = () => {
    setCardToChange(null)
    sounds.click.play()
  }

  const handleClick = useCallback(
    (card: Card) => {
      if (!cardToChange) return

      sounds.click.play()
      setCardToChange(null)
      const newTeam = [...team] as FiveOrLessArray<Card>
      newTeam[cardToChange] = card
      setTeam(newTeam)
    },
    [setTeam, cardToChange, setCardToChange, team]
  )

  const Header = () => (
    <header className="bg-[#282828] w-full h-[20%] min-h-[100px] grid grid-cols-[1fr_8fr] justify-items-center items-center">
      <button
        onClick={handleClose}
        className="cursor-pointer bg-v_red_gradient border-v_red text-white text-[clamp(30px,5vw,50px)] font-stroke border-2 border-main ml-[10%] min-w-[150px] aspect-[16/9] hover:border-white"
      >
        {texts.close}
      </button>
      <span className="text-[clamp(60px,5vw,100px)] text-center">
        {filteredCards.length > 0 ? texts.chooseCard : texts.noCards}
      </span>
    </header>
  )

  const Cards = () => (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] justify-items-center w-[100vw] min-h-full">
      {filteredCards.map((card, index) => (
        <button
          key={index}
          className="w-full max-w-[300px] min-w-[200px] aspect-[9/16] rounded-[20px] relative overflow-hidden cursor-pointer mb-[5%] bg-transparent border-2 border-transparent hover:opacity-70"
          onClick={() => handleClick(card)}
        >
          <CardDisplay card={card} />
        </button>
      ))}
    </div>
  )

  return (
    <div className="absolute w-[100vw] min-h-[100dvh] z-[1000]">
      <Header />
      {filteredCards.length > 0 && <Cards />}
    </div>
  )
}
