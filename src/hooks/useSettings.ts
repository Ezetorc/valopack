import { Dictionary } from '../models/Dictionary.ts'
import { dictionaries } from '../constants/dictionaries.ts'
import { appName, backgrounds } from '../valopack.config.ts'
import { SettingsStore } from '../models/SettingsStore.ts'
import { getSettingsStore } from '../stores/getSettingsStore.ts'
import { useCallback, useMemo } from 'react'
import { Section } from '../models/Section.ts'
import { Language } from '../models/Language.ts'

export function useSettings () {
  const settingsStore: SettingsStore = getSettingsStore()
  const { getLanguage, getIsAudioMuted, setIsAudioMuted } = settingsStore
  const language: Language = getLanguage()
  const isAudioMuted: boolean = getIsAudioMuted()
  const texts: Dictionary = useMemo(() => dictionaries[language], [language])

  const updatePage = (section: Section): void => {
    const HTMLElement: HTMLElement = document.documentElement

    document.title = `${appName}: ${texts[section]}`
    HTMLElement.style.background = backgrounds[section]
  }

  const toggleAudioMuted = (): void => {
    setIsAudioMuted(!isAudioMuted)
  }

  const playAudio = useCallback(
    (audio: HTMLAudioElement) => {
      if (!isAudioMuted) {
        audio.play()
      }
    },
    [isAudioMuted]
  )

  return { ...settingsStore, texts, updatePage, toggleAudioMuted, playAudio }
}
