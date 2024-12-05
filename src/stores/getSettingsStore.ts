import { create } from 'zustand'
import { defaultLanguage } from '../valopack.config'
import { SettingsStore } from '../models/SettingsStore'

export const getSettingsStore = create<SettingsStore>((set, get) => ({
  language: defaultLanguage,
  getLanguage: () => get().language,
  setLanguage: newLanguage => set({ language: newLanguage }),

  settingsOpen: false,
  getSettingsOpen: () => get().settingsOpen,
  setSettingsOpen: newSettingsOpen => set({ settingsOpen: newSettingsOpen }),

  creditsOpen: false,
  getCreditsOpen: () => get().creditsOpen,
  setCreditsOpen: newCreditsOpen => set({ creditsOpen: newCreditsOpen }),

  isAudioMuted: true,
  getIsAudioMuted: () => get().isAudioMuted,
  setIsAudioMuted: newIsAudioMuted => set({ isAudioMuted: newIsAudioMuted })
}))
