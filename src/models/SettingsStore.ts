import { Language } from "./Language"

export interface SettingsStore {
  language: Language
  setLanguage: (newLanguage: Language) => void
  settingsOpen: boolean
  setSettingsOpen: (isOpen: boolean) => void
  headerVisible: boolean
  setHeaderVisible: (isVisible: boolean) => void
}
