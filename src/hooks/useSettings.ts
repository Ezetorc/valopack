import { Dictionary } from '../models/Dictionary.ts'
import { dictionaries } from '../constants/dictionaries.ts'
import { appName, backgrounds } from '../valopack.config.ts'
import { SettingsStore } from '../models/SettingsStore.ts'
import { getSettingsStore } from '../stores/getSettingsStore.ts'
import { useCallback, useMemo } from 'react'
import { Section } from '../models/Section.ts'
import { Audios } from '../constants/Audios.ts'
import { AudioId } from '../models/Audio.ts'

export function useSettings () {
  const settingsStore: SettingsStore = getSettingsStore()
  const { language, isAudioMuted, setIsAudioMuted } = settingsStore
  const texts: Dictionary = useMemo(() => dictionaries[language], [language])

  const updatePage = (section: Section): void => {
    const documentElement: HTMLElement = document.documentElement

    document.title = `${appName}: ${texts[section]}`
    documentElement.style.background = backgrounds[section]
  }

  const toggleAudioMuted = (): void => {
    setIsAudioMuted(!isAudioMuted)
  }

  const playAudio = useCallback(
    (audioId: AudioId) => {
      if (isAudioMuted) return

      const audioElement = new Audio(Audios[audioId])
      audioElement.play()
    },
    [isAudioMuted]
  )

  return { ...settingsStore, texts, updatePage, toggleAudioMuted, playAudio }
}
