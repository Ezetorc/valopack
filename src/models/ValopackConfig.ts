import { Agent } from './Agent'
import { Attributes } from './Attributes'
import { Language } from './Language'
import { Section } from './Section'
import { Team } from './Team'

export interface ValopackConfig {
  appName: string
  levelMultiplier: number
  defaultLanguage: Language
  creditsWinned: number
  paths: { [key in Section]: string }
  teamColors: { [key in Team]: string }
  backgrounds: { [key in Section]: string }
  initialAgentsNames: Agent['name'][]
  initialAttributes: Attributes
}
