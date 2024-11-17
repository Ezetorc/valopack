import { useEffect, useState } from 'react'
import { useUser } from '../../../hooks/useUser.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { CardSlot } from './CardSlot.tsx'
import { Selector } from './Selector.tsx'
import { backgrounds } from '../../../valopack.config.ts'
import { Card } from '../../../models/Card.ts'
import './Team.css'

export default function Team () {
  const { team, cardToChange } = useUser()
  const { texts, updateSection } = useSettings()
  const [cards, setCards] = useState<(Card | null)[]>([])

  useEffect(
    () => updateSection(texts.team, backgrounds.team, true),
    [updateSection, texts.team]
  )

  useEffect(() => {
    const newAgents = []

    for (let i = 0; i < 5; i++) {
      const agent = team[i]
      if (agent) {
        newAgents.push(agent)
      } else {
        newAgents.push(null)
      }
    }

    setCards(newAgents)
  }, [setCards, team])

  return (
    <>
      {!cardToChange ? (
        <section className='team'>
          {cards.map((card, index) => (
            <CardSlot key={index} index={index} card={card ? card : null} />
          ))}
        </section>
      ) : (
        <Selector />
      )}
    </>
  )
}
