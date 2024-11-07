import { Agent } from './Agent.ts'
import { Attributes } from './Attributes.ts'
import { Language } from './Language.ts'
import { Section } from './Section.ts'
import { Team } from './Team.ts'

export interface ValopackConfig {
  appName: string
  levelMultiplier: number
  defaultLanguage: Language
  creditsWinned: number
  paths: { [key in Section]: string }
  teamColors: { [key in Team]: string }
  backgrounds: { [key in Section]: string }
  initialAgentsNames: [
    Agent['name'],
    Agent['name'],
    Agent['name'],
    Agent['name'],
    Agent['name']
  ]
  initialAttributes: Attributes
}
