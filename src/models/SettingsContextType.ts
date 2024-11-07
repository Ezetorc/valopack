import { Language } from './Language.ts'

export default interface SettingsContextType {
  language: Language
  setLanguage: React.Dispatch<React.SetStateAction<Language>>
  settingsOpen: boolean
  setSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>
  headerVisible: boolean
  setHeaderVisible: React.Dispatch<React.SetStateAction<boolean>>
}
