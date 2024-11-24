import React, { useEffect, useRef, ReactNode } from 'react'

interface ModalProps {
  children?: ReactNode
  onLoad?: () => Promise<void>
  className?: string
}

export function Modal ({ children, onLoad, className }: ModalProps) {
  const modalRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  useEffect((): void => {
    async function fetchData () {
      if (onLoad) {
        await onLoad()
      }
    }
    fetchData()
  }, [onLoad])

  return (
    <div
      className='fixed w-screen h-screen bg-[#0008] flex items-center justify-center z-[1000]'
      ref={modalRef}
    >
      <div
        className={`bg-v_black w-[25%] min-w-[400px] aspect-[12/13] relative border-y border-white animate-appear ${className}`}
      >
        {children}
      </div>
    </div>
  )
}
