import { ProductType } from '../types/ProductType'

export interface Dictionary {
  addCard: string
  buy: string
  cantBuy: (product: ProductType, credits: number) => string
  chooseCard: string
  close: string
  controller: string
  controllerPack: string
  duelistPack: string
  initiatorPack: string
  sentinelPack: string
  mixedPack: string
  newPack: string
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
  wannaBuy: (product: ProductType) => string
}
