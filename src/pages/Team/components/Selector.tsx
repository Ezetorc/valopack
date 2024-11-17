import { useCallback } from 'react'
import { useUser } from '../../../hooks/useUser.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { sounds } from '../../../constants/sounds.ts'
import CardDisplay from '../../../components/CardDisplay.tsx'
import './Selector.css'
import { FiveOrLessArray } from '../../../models/FiveOrLessArray.ts'
import { Card } from '../../../models/Card.ts'

export function Selector () {
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
    <header className='selector__header'>
      <button onClick={handleClose}>{texts.close}</button>
      <span>{filteredCards.length > 0 ? texts.chooseCard : texts.noCards}</span>
    </header>
  )

  const Cards = () => (
    <div className='selector__cards'>
      {filteredCards.map((card, index) => (
        <button
          key={index}
          className='selector__card'
          onClick={() => handleClick(card)}
        >
          <CardDisplay card={card} />
        </button>
      ))}
    </div>
  )

  return (
    <div className='selector'>
      <Header />
      {filteredCards.length > 0 && <Cards />}
    </div>
  )
}
