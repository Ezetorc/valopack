import { create } from 'zustand'
import { defaultLanguage } from '../valopack.config'
import { SettingsStore } from '../models/SettingsStore'

export const getSettingsStore = create<SettingsStore>(set => ({
  language: defaultLanguage,
  setLanguage: newLanguage => set({ language: newLanguage }),

  settingsOpen: false,
  setSettingsOpen: isOpen => set({ settingsOpen: isOpen })
}))
