import { ProductType } from "../types/ProductType";

export interface Dictionary {
  addCard: string;
  buy: string;
  cantBuy: (product: ProductType, credits: number) => string;
  chooseCard: string;
  close: string;
  controller: string;
  controllerPack: string;
  credits: string;
  duelist: string;
  duelistPack: string;
  game: string;
  home: string;
  initiator: string;
  initiatorPack: string;
  kingdomCredits: string;
  mixedPack: string;
  newPack: string;
  noCards: string;
  play: string;
  sentinel: string;
  sentinelPack: string;
  settings: string;
  shop: string;
  start: string;
  team: string;
  clickToDescriptions: string;
  attack: {
    name: string;
    description: string;
  };
  health: {
    name: string;
    description: string;
  };
  defense: {
    name: string;
    description: string;
  };
  speed: {
    name: string;
    description: string;
  };
  precision: {
    name: string;
    description: string;
  };
  critic: {
    name: string;
    description: string;
  };
  resistance: {
    name: string;
    description: string;
  };
  wannaBuy: (product: ProductType) => string;
}
