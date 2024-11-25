import { Dictionary } from '../models/Dictionary.ts'
import { dictionaries } from '../constants/dictionaries.ts'
import { appName } from '../valopack.config.ts'
import { SettingsStore } from '../models/SettingsStore.ts'
import { getSettingsStore } from '../stores/getSettingsStore.ts'
import { useCallback, useMemo } from 'react'

export function useSettings () {
  const settingsStore: SettingsStore = getSettingsStore()
  const { language, isAudioMuted, setIsAudioMuted } = settingsStore
  const texts: Dictionary = useMemo(() => dictionaries[language], [language])

  const updateSection = (pageTitle: string, background: string): void => {
    document.title = `${appName}: ${pageTitle}`

    const HTMLElement: HTMLElement = document.documentElement
    if (HTMLElement) {
      HTMLElement.style.background = background
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

  return { ...settingsStore, texts, updateSection, toggleAudioMuted, playAudio }
}
