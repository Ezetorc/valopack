import { useEffect, useState } from 'react'
import { useUser } from '../../../hooks/useUser.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { CardSlotDisplay } from './CardSlotDisplay.tsx'
import { TeamSelector } from './TeamSelector.tsx'
import { Header } from '../../../components/Header.tsx'
import { CardSlot } from '../../../models/CardSlot.ts'
import { clickAudio } from '../../../constants/audios.ts'
import { getCardSlotsByTeam } from '../utilities/getCardSlotsByTeam.ts'

export default function TeamDisplay () {
  const { selectorVisible, setSelectorVisible, inventory } = useUser()
  const { updatePage, playAudio } = useSettings()
  const [cardSlotToChange, setCardSlotToChange] = useState<CardSlot>(null)
  const [cardSlots, setCardSlots] = useState<{ [key: string]: CardSlot }>(() =>
    getCardSlotsByTeam(inventory.getCardsInTeam())
  )

  const handleClick = (clickedCardSlot: CardSlot): void => {
    playAudio(clickAudio)
    setSelectorVisible(true)
    setCardSlotToChange(clickedCardSlot)
  }

  useEffect(() => {
    setCardSlots(getCardSlotsByTeam(inventory.getCardsInTeam()))
  }, [inventory])

  useEffect(() => {
    updatePage('team')
  }, [updatePage])

  return (
    <>
      {!selectorVisible ? (
        <>
          <Header />
          <main className='grid grid-cols-[repeat(5,1fr)] place-items-center w-full min-h-dvh pt-[10vh]'>
            {Object.values(cardSlots).map((cardSlot, index) => (
              <CardSlotDisplay
                key={index}
                cardSlot={cardSlot}
                handleClick={() => handleClick(cardSlot)}
              />
            ))}
          </main>
        </>
      ) : (
        <TeamSelector cardSlotToChange={cardSlotToChange} />
      )}
    </>
  )
}
