import { useSettings } from '../../../hooks/useSettings.ts'
import { Pack } from '../models/Pack.ts'

interface PackDisplayProps {
  pack: Pack
  onAnimationEnd?: () => void
}

export function PackDisplay ({ pack, onAnimationEnd }: PackDisplayProps) {
  const { playAudio } = useSettings()

  const handleAnimationStart = (): void => {
    playAudio("opening")
  }

  const handleAnimationEnd = (): void => {
    if (onAnimationEnd) {
      onAnimationEnd()
    }
  }

  return (
    <article
      className='w-[20%] aspect-[9/16] grid relative animate-opening'
      onAnimationEnd={handleAnimationEnd}
      onAnimationStart={handleAnimationStart}
    >
      <img className='w-full h-full' src={pack.image} alt='Product Image' />
    </article>
  )
}
