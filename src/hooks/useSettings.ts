import { Dictionary } from '../models/Dictionary.ts'
import { dictionaries } from '../constants/dictionaries.ts'
import { appName } from '../valopack.config.ts'
import { SettingsStore } from '../models/SettingsStore.ts'
import { getSettingsStore } from '../stores/getSettingsStore.ts'

export function useSettings () {
  const settingsStore: SettingsStore = getSettingsStore()
  const { language, headerVisible, setHeaderVisible } = settingsStore
  const texts: Dictionary = dictionaries[language]

  const updateSection = (
    name: string,
    background: string,
    newHeaderVisible: boolean
  ): void => {
    document.title = `${appName}: ${name}`

    if (headerVisible != newHeaderVisible) {
      setHeaderVisible(newHeaderVisible)
    }

    const HTMLElement: HTMLElement = document.documentElement
    if (HTMLElement) {
      HTMLElement.style.background = background
    }
  }

  return { ...settingsStore, texts, updateSection }
}
