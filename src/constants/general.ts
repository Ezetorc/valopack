import Position from '../classes/Position'
import Agent from '../interfaces/Agent'
import Attributes from '../interfaces/Attributes'
import { Language } from '../types/Language'
import { Role } from '../types/Role'
import getTeam from '../utils/getTeam'

export const appName: string = 'VALOPACK'
export const levelMultiplier: number = 1
export const defaultLanguage: Language = 'en'
export const creditsPerGameWinned: number = 1000
export const teamColors = {
  ally: '#348ac7',
  enemy: '#b83231'
}
export const allyPositions: Position[] = [
  new Position(5, 0),
  new Position(0, 1),
  new Position(0, 2),
  new Position(0, 3),
  new Position(0, 4)
]
export const enemyPositions: Position[] = [
  new Position(6, 0),
  new Position(6, 1),
  new Position(6, 2),
  new Position(6, 3),
  new Position(6, 4)
]
export const paths: { [key: string]: string } = {
  home: '/',
  shop: '/shop',
  team: '/team',
  play: '/play'
}
export const defaultTeamRoles: Role[] = [
  'controller',
  'duelist',
  'sentinel',
  'duelist',
  'initiator'
]
export const initialTeam: Agent[] = getTeam([
  'Sage',
  'Brimstone',
  'Phoenix',
  'Jett',
  'Sova'
])
export const defaultAttributes: Attributes = {
  attack: 50,
  health: 100,
  defense: 10,
  speed: 1,
  precision: 90,
  critic: 20,
  resistance: 30
}
