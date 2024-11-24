import { useEffect, useState } from 'react'
import { useUser } from '../../../hooks/useUser.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { CardSlotDisplay } from './CardSlotDisplay.tsx'
import { backgrounds } from '../../../valopack.config.ts'
import { sounds } from '../../../constants/sounds.ts'
import { TeamSelector } from './TeamSelector.tsx'
import { Header } from '../../../components/Header.tsx'
import { CardSlot } from '../../../models/CardSlot.ts'
import { Card } from '../../../models/Card.ts'

export default function TeamDisplay () {
  const { selectorVisible, setSelectorVisible, inventory } = useUser()
  const { texts, updateSection } = useSettings()
  const [cardSlotToChange, setCardSlotToChange] = useState<CardSlot>(null)

  const getCardSlotsByTeam = (team: Card[]): { [key: string]: CardSlot } => {
    return team.reduce<{ [key: string]: CardSlot }>(
      (slots, card, index) => {
        slots[index] = card
        return slots
      },
      { 0: null, 1: null, 2: null, 3: null, 4: null }
    )
  }

  const [cardSlots, setCardSlots] = useState<{ [key: string]: CardSlot }>(() =>
    getCardSlotsByTeam(inventory.getCardsInTeam())
  )

  const handleClick = (clickedCardSlot: CardSlot): void => {
    sounds.click.play()
    setSelectorVisible(true)
    setCardSlotToChange(clickedCardSlot)
  }

  useEffect(() => {
    setCardSlots(getCardSlotsByTeam(inventory.getCardsInTeam()))
  }, [inventory])

  useEffect(
    () => updateSection(texts.team, backgrounds.team),
    [updateSection, texts.team]
  )

  return (
    <>
      {!selectorVisible ? (
        <>
          <Header />
          <section className='grid grid-cols-[repeat(5,1fr)] place-items-center w-full min-h-dvh pt-[10vh]'>
            {Object.values(cardSlots).map((cardSlot, index) => (
              <CardSlotDisplay
                key={index}
                cardSlot={cardSlot}
                handleClick={() => handleClick(cardSlot)}
              />
            ))}
          </section>
        </>
      ) : (
        <TeamSelector cardSlotToChange={cardSlotToChange} />
      )}
    </>
  )
}