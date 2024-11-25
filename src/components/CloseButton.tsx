import { useSettings } from '../hooks/useSettings'

interface CloseButtonProps {
  onClose: () => void
  className?: string
}

export function CloseButton ({ onClose, className }: CloseButtonProps) {
  const { texts } = useSettings()

  return (
    <button
      onClick={onClose}
      className={`aspect-video bg-v_red_gradient border-2 border-v_red font-stroke text-[clamp(30px,_2vw,_40px)] hover:border-white cursor-pointer ${className}`}
    >
      {texts.close}
    </button>
  )
}
