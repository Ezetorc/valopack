import { ReactNode } from 'react'
import { Square } from '../models'
import './SquareDisplay.css'

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
  const className: string = `square ${Array.from(square.classes).join(' ')}`

  return (
    <button
      className={className}
      onClick={onClick}
      style={{ ...square.style, backgroundColor: color }}
    >
      {children}
    </button>
  )
}
