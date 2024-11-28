import { Attributes } from './Attributes.ts'
import { Language } from './Language.ts'
import { LanguageOption } from './LanguageOption.ts'
import { Section } from './Section.ts'
import { TeamSide } from './TeamSide.ts'

export interface ValopackConfig {
  appName: Readonly<string>
  maxHealth: Readonly<number>
  maxCardLevel: Readonly<number>
  initialCredits: Readonly<number>
  levelMultiplier: Readonly<number>
  defaultLanguage: Readonly<Language>
  creditsWinned: Readonly<number>
  paths: Readonly<{ [key in Section]: string }>
  teamColors: Readonly<{ [key in TeamSide]: string }>
  backgrounds: Readonly<{ [key in Section]: string }>
  initialCardsNames: Readonly<string[]>
  initialAttributes: Readonly<Attributes>
  maxLeveledAttributes: Readonly<Attributes>
  languages: Readonly<LanguageOption[]>
}
