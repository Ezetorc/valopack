import { ReactNode } from 'react'
import './SquareDisplay.css'

interface SquareDisplayProps {
  children: ReactNode
  color: string
  style: { [key: string]: string } 
  classes: Set<string>
  onClick: () => void
}

export function SquareDisplay ({
  children,
  color,
  style,
  classes,
  onClick
}: SquareDisplayProps) {
  const classNames = `square ${Array.from(classes).join(' ')}`

  return (
    <button
      className={classNames}
      onClick={onClick}
      style={{ backgroundColor: color, ...style }}
    >
      {children}
    </button>
  )
}
