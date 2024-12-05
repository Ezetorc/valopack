import { Language } from './Language'

export interface SettingsStore {
  language: Language
  getLanguage: () => Language
  setLanguage: (newLanguage: Language) => void

  settingsOpen: boolean
  getSettingsOpen: () => boolean
  setSettingsOpen: (newSettingsOpen: boolean) => void

  creditsOpen: boolean
  getCreditsOpen: () => boolean
  setCreditsOpen: (newCreditsOpen: boolean) => void

  isAudioMuted: boolean
  getIsAudioMuted: () => boolean
  setIsAudioMuted: (newIsAudioMuted: boolean) => void
}
