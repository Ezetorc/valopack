import { ReactNode } from 'react'

interface ActionProps {
  usesLeft?: number
  onClick: () => void
  children?: ReactNode
  className?: string
}

export function Action ({ onClick, children, className }: ActionProps) {
  return (
    <button
      className={`${className} w-full h-[60%] border-[2px] text-[clamp(1px,_2vw,_50px)] font-stroke hover:border-white hover:cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
