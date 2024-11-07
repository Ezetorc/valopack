import { useRef } from 'react'
import { sounds } from '../../../constants/sounds.ts'
import { useShop } from '../hooks/useShop.ts'
import './Pack.css'

interface PackProps {
  onAnimationEnd: () => void
}

export function Pack ({ onAnimationEnd }: PackProps) {
  const { ownedProduct } = useShop()
  const packRef = useRef<HTMLElement | null>(null)
  const packImage = ownedProduct?.pack.image ?? ''

  const handleAnimationStart = () => {
    sounds.opening.play()
  }

  const handleAnimationEnd = () => {
    onAnimationEnd()
  }

  return (
    <article
      className='pack'
      onAnimationEnd={handleAnimationEnd}
      onAnimationStart={handleAnimationStart}
      ref={packRef}
    >
      <img src={packImage} alt='Product Image' />
    </article>
  )
}
