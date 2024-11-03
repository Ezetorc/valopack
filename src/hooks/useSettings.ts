import { useContext } from 'react'
import { SettingsContext } from '../contexts/SettingsContext'
import SettingsContextType from '../models/SettingsContextType'
import { Dictionary } from '../models/Dictionary'
import { dictionaries } from '../constants/dictionaries'
import { appName } from '../valopack.config'

export function useSettings () {
  const context: SettingsContextType | undefined = useContext(SettingsContext)
  if (!context) throw new Error("Context doesn't have a Provider")

  const { language, headerVisible, setHeaderVisible } = context
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

    const htmlElement = document.documentElement
    if (htmlElement) {
      htmlElement.style.background = background
    }
  }

  return { ...context, texts, updateSection }
}
