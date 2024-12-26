import { Product } from '../pages/Shop/models/Product.ts'
import { AbilityInfo } from './AbilityInfo.ts'

export interface Dictionary {
  addCard: string
  buy: string
  audio: string
  youHave: string
  creditsInfo: string
  cantBuy: (product: Product, name: string, credits: number) => string
  chooseCard: string
  close: string
  controller: string
  packs: {
    controller: string
    duelist: string
    initiator: string
    sentinel: string
    mixed: string
    new: string
  }
  credits: string
  duelist: string
  home: string
  initiator: string
  noCards: string
  play: string
  sentinel: string
  settings: string
  shop: string
  start: string
  team: string
  clickToDescriptions: string
  attributes: {
    attack: {
      name: string
      description: string
    }
    health: {
      name: string
      description: string
    }
    defense: {
      name: string
      description: string
    }
    speed: {
      name: string
      description: string
    }
    precision: {
      name: string
      description: string
    }
    critic: {
      name: string
      description: string
    }
    resistance: {
      name: string
      description: string
    }
  }
  result: {
    ally: string
    enemy: string
    draw: string
  }
  actions: {
    move: string
    attack: string
  }
  loading: string
  language: string
  level: string
  abilities: {
    skySmoke: AbilityInfo
    stimBeacon: AbilityInfo
    hotHands: AbilityInfo
  }
  wannaBuy: (name: string) => string
}
