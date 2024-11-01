import { createContext, ReactNode, useState } from 'react'
import { Language } from '../models/Language'
import SettingsContextType from '../models/SettingsContextType'
import { defaultLanguage } from '../constants/general'

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
