import { Dictionaries } from "../types/Dictionaries";
import { ProductType } from "../types/ProductType";

export const dictionary: Dictionaries = {
  en: {
    addCard: "Add Card",
    buy: "Buy",
    cantBuy: (product: ProductType, credits: number) =>
      `You need $${product.price - credits} more to buy ${product.name}`,
    chooseCard: "Choose a card",
    close: "Close",
    controller: "Controller",
    controllerPack: "Controller Pack",
    credits: "Credits",
    duelist: "Duelist",
    duelistPack: "Duelist Pack",
    game: "Game",
    home: "Home",
    initiator: "Initiator",
    initiatorPack: "Initiator Pack",
    kingdomCredits: "Kingdom Credits",
    mixedPack: "Mixed Pack",
    newPack: "New Pack",
    noCards: "No cards to change...",
    play: "Play",
    sentinel: "Sentinel",
    sentinelPack: "Sentinel Pack",
    settings: "Settings",
    shop: "Shop",
    start: "Start",
    team: "Team",
    clickToDescriptions: "Click on an attribute to see its description",
    attack: {
      name: "Attack",
      description: "Base damage dealt with normal attacks",
    },
    health: {
      name: "Health",
      description: "Damage you can take before being defeated",
    },
    defense: {
      name: "Defense",
      description: "Reduces damage from enemy attacks",
    },
    speed: {
      name: "Speed",
      description: "Determines movement range on the grid",
    },
    precision: {
      name: "Precision",
      description: "Chance to hit with attacks or abilities",
    },
    critic: {
      name: "Critic",
      description: "Chance to deal double damage",
    },
    resistance: {
      name: "Resistance",
      description: "Reduces negative effects",
    },

    wannaBuy: (product: ProductType) => `Do you want to buy ${product.name}?`,
  },

  es: {
    addCard: "Añadir Carta",
    buy: "Comprar",
    cantBuy: (product: ProductType, credits: number) =>
      `Necesitas $${product.price - credits} más para comprar ${product.name}`,
    chooseCard: "Elige una carta",
    close: "Cerrar",
    controller: "Controlador",
    controllerPack: "Pack Controlador",
    credits: "Créditos",
    duelist: "Duelista",
    duelistPack: "Pack Duelista",
    game: "Partida",
    home: "Inicio",
    initiator: "Iniciador",
    initiatorPack: "Pack Iniciador",
    kingdomCredits: "Créditos Kingdom",
    mixedPack: "Pack Mixto",
    newPack: "Pack Nuevo",
    noCards: "No tienes cartas para cambiar...",
    play: "Jugar",
    sentinel: "Centinela",
    sentinelPack: "Pack Centinela",
    settings: "Opciones",
    shop: "Tienda",
    start: "Empezar",
    team: "Equipo",
    clickToDescriptions: "Click en un atributo para ver su descripción",
    attack: {
      name: "Ataque",
      description: "Daño base que puede infligir en ataques normales",
    },
    health: {
      name: "Vida",
      description:
        "La cantidad de daño que puede recibir antes de ser derrotado",
    },
    defense: {
      name: "Defensa",
      description: "Reduce el daño recibido de ataques enemigos",
    },
    speed: {
      name: "Velocidad",
      description: "Determina el rango de movimiento en la cuadrícula",
    },
    precision: {
      name: "Precisión",
      description: "Probabilidad de ataque o habilidad de acertar",
    },
    critic: {
      name: "Crítico",
      description:
        "Probabilidad de infligir un golpe crítico que haga el doble de daño base",
    },
    resistance: {
      name: "Resistencia",
      description: "Reducción porcentual de los efectos negativos",
    },
    wannaBuy: (product: ProductType) => `¿Quieres comprar ${product.name}?`,
  },
};
