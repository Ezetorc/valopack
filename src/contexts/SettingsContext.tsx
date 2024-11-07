import { createContext, ReactNode, useState } from 'react'
import { Language } from '../models/Language.ts'
import SettingsContextType from '../models/SettingsContextType.ts'
import { defaultLanguage } from '../valopack.config.ts'

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
)

export function SettingsContextProvider ({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(defaultLanguage)
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false)
  const [headerVisible, setHeaderVisible] = useState<boolean>(false)

  return (
    <SettingsContext.Provider
      value={{
        language,
        setLanguage,
        settingsOpen,
        setSettingsOpen,
        headerVisible,
        setHeaderVisible
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}
