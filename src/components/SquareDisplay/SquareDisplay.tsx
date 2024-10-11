import { ReactNode } from 'react'
import './SquareDisplay.css'

interface SquareDisplayProps {
  children: ReactNode
  color: string
  onClick: () => void
}

export default function SquareDisplay ({
  children,
  color,
  onClick
}: SquareDisplayProps) {
  return (
    <button
      onClick={onClick}
      className='square'
      style={{ backgroundColor: color }}
    >
      {children}
    </button>
  )
}
