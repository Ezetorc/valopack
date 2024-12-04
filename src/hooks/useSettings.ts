import { Dictionary } from '../models/Dictionary.ts'
import { dictionaries } from '../constants/dictionaries.ts'
import { appName, backgrounds } from '../valopack.config.ts'
import { SettingsStore } from '../models/SettingsStore.ts'
import { getSettingsStore } from '../stores/getSettingsStore.ts'
import { useCallback, useMemo } from 'react'
import { Section } from '../models/Section.ts'

export function useSettings () {
  const settingsStore: SettingsStore = getSettingsStore()
  const { language, isAudioMuted, setIsAudioMuted } = settingsStore
  const texts: Dictionary = useMemo(() => dictionaries[language], [language])

  const updatePage = (section: Section): void => {
    document.title = `${appName}: ${texts[section]}`

    const HTMLElement: HTMLElement = document.documentElement
    if (HTMLElement) {
      HTMLElement.style.background = backgrounds[section]
    }
  }

  const toggleAudioMuted = () => {
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
