import { Language } from './Language'

export interface SettingsStore {
  language: Language
  setLanguage: (newLanguage: Language) => void
  settingsOpen: boolean
  setSettingsOpen: (newSettingsOpen: boolean) => void
  creditsOpen: boolean
  setCreditsOpen: (newCreditsOpen: boolean) => void
  isAudioMuted: boolean
  setIsAudioMuted: (newIsAudioMuted: boolean) => void
}
