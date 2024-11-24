import { clsx } from 'clsx'
import { ReactNode } from 'react'

interface ActionDisplayProps {
  usesLeft?: number
  onClick: () => void
  children?: ReactNode
  className?: string
}

export function ActionDisplay ({
  onClick,
  children,
  className,
  usesLeft = -1
}: ActionDisplayProps) {
  const isDisabled: boolean = usesLeft == 0

  const handleClick = (): void => {
    if (!isDisabled) {
      onClick()
    }
  }

  return (
    <button
      className={clsx(
        'w-full h-[60%] border-[2px] text-[clamp(1px,_2vw,_50px)] font-stroke hover:cursor-pointer',
        isDisabled
          ? 'border-v_gray bg-v_gray_gradient hover:cursor-not-allowed'
          : 'hover:border-white',
        className
      )}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}
