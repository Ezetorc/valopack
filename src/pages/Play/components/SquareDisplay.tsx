import { ReactNode } from 'react'
import { Square } from '../models/Square'

interface SquareDisplayProps {
  children: ReactNode
  color: string
  square: Square
  onClick: () => void 
}

export function SquareDisplay ({
  children,
  color,
  onClick,
  square
}: SquareDisplayProps) {
  const className: string = `${Array.from(square.classes).join(' ')}`

  return (
    <button
      className={`aspect-square w-full relative flex flex-col justify-center items-center border-[5px] border-transparent hover:cursor-pointer hover:border-white ${className}`}
      onClick={onClick}
      aria-label={`Square ${square.position.x}-${square.position.y}`}
      style={{ ...square.style, backgroundColor: color }}
    >
      {children}
    </button>
  )
}
