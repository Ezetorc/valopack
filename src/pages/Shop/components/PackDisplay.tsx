import { sounds } from '../../../constants/sounds.ts'
import { Pack } from '../models/Pack.ts'
import './PackDisplay.css'

interface PackDisplayProps {
  pack: Pack
  onAnimationEnd?: () => void
}

export function PackDisplay ({ pack, onAnimationEnd }: PackDisplayProps) {
  const handleAnimationStart = () => {
    sounds.opening.play()
  }

  const handleAnimationEnd = () => {
    if (onAnimationEnd) {
      onAnimationEnd()
    }
  }

  return (
    <article
      className='pack'
      onAnimationEnd={handleAnimationEnd}
      onAnimationStart={handleAnimationStart}
    >
      <img src={pack.image} alt='Product Image' />
    </article>
  )
}
