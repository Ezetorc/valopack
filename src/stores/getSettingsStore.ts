import { create } from 'zustand'
import { defaultLanguage } from '../valopack.config'
import { SettingsStore } from '../models/SettingsStore'

export const getSettingsStore = create<SettingsStore>(set => ({
  language: defaultLanguage,
  setLanguage: newLanguage => set({ language: newLanguage }),

  settingsOpen: false,
  setSettingsOpen: newSettingsOpen => set({ settingsOpen: newSettingsOpen }),

  creditsOpen: false,
  setCreditsOpen: newCreditsOpen => set({ creditsOpen: newCreditsOpen }),

  isAudioMuted: true,
  setIsAudioMuted: newIsAudioMuted => set({ isAudioMuted: newIsAudioMuted })
}))
