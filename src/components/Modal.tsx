import { useEffect, useRef, ReactNode } from 'react'
import './Modal.css'

interface ModalProps {
  children?: ReactNode
  onLoad?: () => Promise<void>
  className?: string
}

export function Modal ({ children, onLoad, className }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchData () {
      if (onLoad) {
        await onLoad()
      }
    }
    fetchData()
  }, [onLoad])

  return (
    <div className='modal-container' ref={modalRef}>
      <div className={`modal-content ${className}`}>{children}</div>
    </div>
  )
}
