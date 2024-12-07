import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Card } from '../models/Card.ts'
import CardDisplay from './CardDisplay.tsx'
import { Agents } from '../services/Agents.service.ts'
import { Agent } from '../models/Agent.ts'

describe('CardDisplay', async () => {
  const agents: Agent[] = await Agents.getByName(['Omen'])
  const card: Card = Agents.getCardsFromAgents(agents)[0]

  it(`Shouldn't show the card level`, () => {
    const component = render(<CardDisplay card={card} showLevel={false} />)

    expect(component.container).not.toHaveTextContent(String(card.level))
  })

  it(`Should show the card name`, () => {
    const component = render(<CardDisplay card={card} />)

    expect(component.container).toHaveTextContent(card.name)
  })

  it(`Should show the card image`, () => {
    const component = render(<CardDisplay card={card} />)

    expect(component.getByAltText('Agent Image')).toHaveAttribute(
      'src',
      card.image
    )
  })
})
