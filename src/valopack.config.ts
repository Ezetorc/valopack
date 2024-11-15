import { ValopackConfig } from './models/ValopackConfig.ts'

export const valopackConfig: ValopackConfig = {
  appName: 'VALOPACK',
  levelMultiplier: 1,
  initialCredits: 10000,
  defaultLanguage: 'en',
  creditsWinned: 1000,
  paths: {
    home: '/',
    shop: '/shop',
    team: '/team',
    play: '/play'
  },
  teamColors: {
    ally: '#348ac7',
    enemy: '#b83231'
  },
  backgrounds: {
    shop: `linear-gradient(
      220deg,
      #65204c,
      #6c2d4c 17%,
      #591e47 39%,
      #240919 81%,
      #3e102d 100%
    )`,
    home: `linear-gradient(
      220deg,
      #372065 0%,
      #4724b6 17%,
      #461e59 39%,
      #170924 81%,
      #1e103e 100%
    )`,
    team: `linear-gradient(
      220deg,
      #285185 0%,
      #2479B6 17%,
      #1E3C59 39%,
      #091824 81%,
      #10303E 100%
    )`,
    play: `linear-gradient(
      220deg,
      #2E2885 0%,
      #6253B8 17%,
      #271E59 39%,
      #0C0924 81%,
      #15103E 100%
    )`
  },
  initialAgentsNames: ['Sage', 'Brimstone', 'Phoenix', 'Jett'],
  initialAttributes: {
    attack: 50,
    health: 100,
    defense: 10,
    speed: 1,
    precision: 90,
    critic: 20,
    resistance: 30
  }
}

export const {
  appName,
  levelMultiplier,
  defaultLanguage,
  creditsWinned,
  paths,
  teamColors,
  backgrounds,
  initialAgentsNames,
  initialAttributes,
  initialCredits
} = valopackConfig
