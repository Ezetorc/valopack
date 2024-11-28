import { levelMultiplier, maxCardLevel } from '../valopack.config'
import { Card } from './Card'

export class Inventory {
  constructor (cards?: Card[]) {
    this.cards = cards ?? []
  }

  public cards: Card[]

  public getCardByName (name: string): Card | undefined {
    return this.cards.find(card => card.name === name)
  }

  public addCards (newCards: Card[]): void {
    for (const newCard of newCards) {
      const currentCard = this.getCardByName(newCard.name)

      if (currentCard) {
        if (currentCard.level <= maxCardLevel) {
          currentCard.level += levelMultiplier
          console.log('currentCard ', currentCard)
        }
      } else {
        this.cards.push(newCard)
      }
    }
  }

  public hasCard (name: string): boolean {
    return this.cards.some(card => card.name === name)
  }

  public getCardsInTeam (): Card[] {
    return this.cards.filter(card => card.isInTeam)
  }

  public getCardsNotInTeam (): Card[] {
    return this.cards.filter(card => !card.isInTeam)
  }
}
