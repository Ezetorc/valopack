import { useSettings } from '../hooks/useSettings.ts'
import { Language } from '../models/Language.ts'
import { clickAudio } from '../constants/audios.ts'
import { Modal } from './Modal.tsx'
import { languages } from '../valopack.config.ts'
import React from 'react'
import { CloseButton } from './CloseButton.tsx'
import { Setting } from './Setting.tsx'

export default function Settings () {
  const { setSettingsOpen, texts, setLanguage, playAudio } = useSettings()

  const handleClose = (): void => {
    setSettingsOpen(false)
    playAudio(clickAudio)
  }

  const handleChangeLanguage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const newLanguage: Language = event.currentTarget.value as Language
    setLanguage(newLanguage)
  }

  return (
    <Modal className='flex flex-col overflow-y-scroll'>
      <header className='w-full h-[20%] grid grid-cols-[2fr,1fr] place-items-center border-b-white border-b-[1px]'>
        <span className='text-[clamp(30px,3vw,80px)]'>{texts.settings}</span>
        <CloseButton className='w-[90%]' onClose={handleClose} />
      </header>

      <div className='w-full h-[80%] flex justify-center'>
        <Setting label={texts.language}>
          <select
            id={texts.language}
            onChange={handleChangeLanguage}
            className='w-[60%] aspect-video bg-v_red_gradient border-2 border-v_red hover:border-[#fff] cursor-pointer text-center text-[clamp(20px,3vw,40px)]'
          >
            {languages.map((language, index) => (
              <option key={index} value={language.value}>
                {language.label}
              </option>
            ))}
          </select>
        </Setting>
      </div>
    </Modal>
  )
}
