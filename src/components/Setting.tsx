import { ReactNode } from 'react'

interface SettingProps {
  label: string
  children: ReactNode
}

export function Setting ({ label, children }: SettingProps) {
  return (
    <div className='w-full h-[150px] grid grid-cols-[1fr_2fr] place-items-center'>
      <label
        className='text-[clamp(40px,_2.5vw,_60px)] pl-[20%] flex'
        htmlFor={label}
      >
        {label}
      </label>

      {children}
    </div>
  )
}
