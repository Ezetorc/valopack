import { ReactNode } from 'react'
import './Action.css'

interface ActionProps {
  usesLeft?: number
  onClick: () => void
  children?: ReactNode
  className?: string
}

export default function Action ({ onClick, children, className }: ActionProps) {
  return (
    <button className={`action ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}
