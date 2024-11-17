import { levelMultiplier } from '../valopack.config'
import { Card } from './Card'

export class Inventory {
  constructor (cards?: Card[]) {
    this.cards = cards ?? []
  }

  public cards: Card[]

  public getCardByName (name: string) {
    return this.cards.find(card => card.name === name)
  }

  public addCards (newCards: Card[]) {
    for (const newCard of newCards) {
      const currentCard = this.getCardByName(newCard.name)

      if (currentCard) {
        currentCard.level += levelMultiplier
      } else {
        this.cards.push(newCard)
      }
    }
  }

  public hasCard (name: string) {
    return this.cards.some(card => card.name === name)
  }

  public getCardsNotInTeam (team: Card[]) {
    return this.cards.filter(
      card => !team.some(teamCard => teamCard.name === card.name)
    )
  }
}
