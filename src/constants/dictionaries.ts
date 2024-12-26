import { Dictionary } from '../models/Dictionary.ts'
import { Product } from '../pages/Shop/models/Product.ts'

export const dictionaries: {
  [key: string]: Dictionary
} = {
  en: {
    addCard: 'Add Card',
    youHave: 'You have',
    buy: 'Buy',
    audio: 'Audio',
    cantBuy: (product: Product, name: string, credits: number) =>
      `You need $${product.price - credits} more to buy ${name}`,
    chooseCard: 'Choose a card',
    packs: {
      controller: 'Controller Pack',
      duelist: 'Duelist Pack',
      initiator: 'Initiator Pack',
      sentinel: 'Sentinel Pack',
      new: 'New Pack',
      mixed: 'Mixed Pack'
    },
    close: 'Close',
    creditsInfo:
      'Get credits by winning matches. You can use credits to buy packs and get new cards to play with new strategys or simply for just collecting all of them.',
    controller: 'Controller',
    credits: 'Credits',
    duelist: 'Duelist',
    home: 'Home',
    initiator: 'Initiator',
    noCards: 'No cards to change...',
    play: 'Play',
    sentinel: 'Sentinel',
    settings: 'Settings',
    shop: 'Shop',
    start: 'Start',
    team: 'Team',
    clickToDescriptions: 'Click on an attribute to see its description',
    attributes: {
      attack: {
        name: 'Attack',
        description: 'Base damage dealt with normal attacks'
      },
      health: {
        name: 'Health',
        description: 'Damage you can take before being defeated'
      },
      defense: {
        name: 'Defense',
        description: 'Reduces damage from enemy attacks'
      },
      speed: {
        name: 'Speed',
        description: 'Determines movement range on the grid'
      },
      precision: {
        name: 'Precision',
        description: 'Chance to hit with attacks or abilities'
      },
      critic: {
        name: 'Critic',
        description: 'Chance to deal double damage'
      },
      resistance: {
        name: 'Resistance',
        description: 'Reduces negative effects'
      }
    },
    result: {
      ally: 'VICTORY!',
      enemy: 'DEFEAT',
      draw: 'DRAW!'
    },
    actions: {
      move: 'Move',
      attack: 'Attack'
    },
    loading: 'LOADING',
    language: 'Language',
    level: 'Level',
    abilities: {
      skySmoke: {
        name: 'Sky Smoke',
        description:
          'Throw a 3x3 smoke that let pass your allies but no enemies'
      },
      stimBeacon: {
        name: 'Stim Beacon',
        description:
          'Throw a stim beacon that increase speed by one of allies around it for two turns.'
      },
      hotHands: {
        name: 'Hot Hands',
        description:
          'Throw a fireball that deals 50 damage to enemies in a 3x3 area.'
      }
    },
    wannaBuy: (name: string) => `Do you want to buy ${name}?`
  },

  es: {
    addCard: 'Añadir Carta',
    buy: 'Comprar',
    youHave: 'Tienes',
    creditsInfo:
      'Consigue créditos ganando partidos. Puedes usar los créditos para comprar packs y conseguir nuevas cartas para jugar con nuevas estrategias o simplemente para coleccionarlas todas.',
    cantBuy: (product: Product, name: string, credits: number) =>
      `Necesitas $${product.price - credits} más para comprar ${name}`,
    chooseCard: 'Elige una carta',
    close: 'Cerrar',
    controller: 'Controlador',
    credits: 'Créditos',
    duelist: 'Duelista',
    home: 'Inicio',
    initiator: 'Iniciador',
    packs: {
      controller: 'Paquete controlador',
      duelist: 'Paquete duelista',
      initiator: 'Paquete iniciador',
      sentinel: 'Paquete centinela',
      new: 'Paquete nuevo',
      mixed: 'Paquete mixto'
    },
    noCards: 'No tienes cartas para cambiar...',
    play: 'Jugar',
    sentinel: 'Centinela',
    settings: 'Opciones',
    shop: 'Tienda',
    start: 'Empezar',
    team: 'Equipo',
    clickToDescriptions: 'Click en un atributo para ver su descripción',
    attributes: {
      attack: {
        name: 'Ataque',
        description: 'Daño base que puede infligir en ataques normales'
      },
      health: {
        name: 'Vida',
        description:
          'La cantidad de daño que puede recibir antes de ser derrotado'
      },
      defense: {
        name: 'Defensa',
        description: 'Reduce el daño recibido de ataques enemigos'
      },
      speed: {
        name: 'Velocidad',
        description: 'Determina el rango de movimiento en la cuadrícula'
      },
      precision: {
        name: 'Precisión',
        description: 'Probabilidad de ataque o habilidad de acertar'
      },
      critic: {
        name: 'Crítico',
        description:
          'Probabilidad de infligir un golpe crítico que haga el doble de daño base'
      },
      resistance: {
        name: 'Resistencia',
        description: 'Reducción porcentual de los efectos negativos'
      }
    },
    result: {
      ally: 'VICTORIA!',
      enemy: 'DERROTA.',
      draw: 'EMPATE!'
    },
    actions: {
      move: 'Mover',
      attack: 'Atacar'
    },
    loading: 'CARGANDO',
    language: 'Idioma',
    level: 'Nivel',
    abilities: {
      skySmoke: {
        name: 'Humo celestial',
        description:
          'Lanza un humo 3x3 que deja pasar a tus aliados pero no a tus enemigos'
      },
      stimBeacon: {
        name: 'Baliza potenciadora',
        description:
          'Lanza una baliza de estímulo que aumenta la velocidad en uno de los aliados a su alrededor durante dos turnos.'
      },
      hotHands: {
        name: 'Manos Calientes',
        description:
          'Tira una bola de fuego que inflige 50 de daño a los enemigos en un área de 3x3.'
      }
    },
    audio: 'Audio',
    wannaBuy: (name: string) => `¿Quieres comprar ${name}?`
  }
}
