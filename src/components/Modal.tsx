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
      className='fixed w-screen h-screen mt-[clamp(-140px,-20vh,-300px)] bg-[#0008] flex items-center justify-center z-[1000]'
      ref={modalRef}
    >
      <div
        className={`bg-v_black w-[clamp(320px,80vw,700px)] h-[600px] relative border-y border-white animate-appear ${className}`}
      >
        {children}
      </div>
    </div>
  )
}
