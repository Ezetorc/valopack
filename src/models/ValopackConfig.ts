import { Attributes } from './Attributes.ts'
import { FiveOrLessArray } from './FiveOrLessArray.ts'
import { Language } from './Language.ts'
import { Section } from './Section.ts'
import { Team } from './Team.ts'

export interface ValopackConfig {
  appName: string
  initialCredits: number
  levelMultiplier: number
  defaultLanguage: Language
  creditsWinned: number
  paths: { [key in Section]: string }
  teamColors: { [key in Team]: string }
  backgrounds: { [key in Section]: string }
  initialAgentsNames: FiveOrLessArray<string>
  initialAttributes: Attributes
}
