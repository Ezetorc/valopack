import { Dictionary } from '../models/Dictionary.ts'
import { dictionaries } from '../constants/dictionaries.ts'
import { appName } from '../valopack.config.ts'
import { SettingsStore } from '../models/SettingsStore.ts'
import { getSettingsStore } from '../stores/getSettingsStore.ts'

export function useSettings () {
  const settingsStore: SettingsStore = getSettingsStore()
  const { language} = settingsStore
  const texts: Dictionary = dictionaries[language]

  const updateSection = (pageTitle: string, background: string): void => {
    document.title = `${appName}: ${pageTitle}`


    const HTMLElement: HTMLElement = document.documentElement
    if (HTMLElement) {
      HTMLElement.style.background = background
    }
  }

  return { ...settingsStore, texts, updateSection }
}
