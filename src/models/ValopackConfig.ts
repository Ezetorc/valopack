import { Attributes } from './Attributes.ts'
import { Language } from './Language.ts'
import { LanguageOption } from './LanguageOption.ts'
import { Section } from './Section.ts'
import { TeamSide } from './TeamSide.ts'

export interface ValopackConfig {
  appName: string
  initialCredits: number
  levelMultiplier: number
  defaultLanguage: Language
  creditsWinned: number
  paths: { [key in Section]: string }
  teamColors: { [key in TeamSide]: string }
  backgrounds: { [key in Section]: string }
  initialCardsNames: string[]
  initialAttributes: Attributes
  languages: LanguageOption[]
}
