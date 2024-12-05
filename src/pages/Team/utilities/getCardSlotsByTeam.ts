import { Card } from '../../../models/Card'
import { CardSlot } from '../../../models/CardSlot'

export function getCardSlotsByTeam (team: Card[]): { [key: string]: CardSlot } {
  return team.reduce<{ [key: string]: CardSlot }>(
    (slots, card, index) => {
      slots[index] = card
      return slots
    },
    { 0: null, 1: null, 2: null, 3: null, 4: null }
  )
}
