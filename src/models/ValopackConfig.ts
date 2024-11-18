import { Attributes } from './Attributes.ts'
import { FiveOrLessArray } from './FiveOrLessArray.ts'
import { Language } from './Language.ts'
import { Section } from './Section.ts'
import { TeamSide } from './TeamSide.ts'

interface LanguageOption {
  label: string
  value: Language
}

export interface ValopackConfig {
  appName: string
  initialCredits: number
  levelMultiplier: number
  defaultLanguage: Language
  creditsWinned: number
  paths: { [key in Section]: string }
  teamColors: { [key in TeamSide]: string }
  backgrounds: { [key in Section]: string }
  initialAgentsNames: FiveOrLessArray<string>
  initialAttributes: Attributes
  languages: LanguageOption[]
}
