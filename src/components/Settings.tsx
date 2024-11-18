import { useSettings } from '../hooks/useSettings.ts'
import { Language } from '../models/Language.ts'
import { sounds } from '../constants/sounds.ts'
import { Modal } from './Modal.tsx'
import { languages } from '../valopack.config.ts'
import React from 'react'

export default function Settings () {
  const { setSettingsOpen, texts, setLanguage } = useSettings()

  const handleClose = (): void => {
    setSettingsOpen(false)
    sounds.click.play()
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const newLanguage: Language = event.currentTarget.value as Language
    setLanguage(newLanguage)
  }

  return (
    <Modal className='flex flex-col overflow-y-auto'>
      <header className='w-full h-[100px] grid grid-cols-[3fr_1fr] border-b border-white place-items-center'>
        <span className='w-full h-full text-center text-[clamp(70px,_4vw,_100px)]'>
          {texts.settings}
        </span>
        <button
          onClick={handleClose}
          className='w-[90%] mr-[20%] aspect-[16/9] bg-gradient-to-t from-[#cd515d] to-[#da3848] border-2 border-v_red font-stroke text-[clamp(30px,_2vw,_40px)] hover:border-white cursor-pointer'
        >
          {texts.close}
        </button>
      </header>

      <div className='w-full h-[150px] grid grid-cols-[1fr_2fr] place-items-center'>
        <span className='text-[clamp(40px,_2.5vw,_60px)] pl-[20%] flex'>
          {texts.language}
        </span>
        <select onChange={handleChange} className='w-full h-full'>
          {languages.map((language, index) => (
            <option key={index} value={language.value}>
              {language.label}
            </option>
          ))}
        </select>
      </div>
    </Modal>
  )
}
