import { useState } from 'react'
import { useShop } from '../hooks/useShop.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { sounds } from '../../../constants/sounds.ts'
import { PackDisplay } from './PackDisplay.tsx'
import './Opener.css'
import CardDisplay from '../../../components/CardDisplay.tsx'

export function Opener () {
  const { ownedProduct, ownedCards, setOwnedProduct } = useShop()
  const { texts } = useSettings()
  const [showCards, setShowCards] = useState<boolean>(false)
  if (!ownedProduct) return null

  const handleAnimationEnd = () => {
    setShowCards(true)
  }

  const handleClose = () => {
    setOwnedProduct(null)
    sounds.click.play()
  }

  return (
    <section className='opener'>
      {showCards ? (
        <div className='opener__cards'>
          <div>
            {ownedCards.map((card, index) => (
              <CardDisplay key={index} card={card} />
            ))}
          </div>

          <button onClick={handleClose}>{texts.close}</button>
        </div>
      ) : (
        <PackDisplay
          pack={ownedProduct.pack}
          onAnimationEnd={handleAnimationEnd}
        />
      )}
    </section>
  )
}
