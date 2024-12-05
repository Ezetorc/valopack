import { useState } from 'react'
import { useShop } from '../hooks/useShop.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { PackDisplay } from './PackDisplay.tsx'
import CardDisplay from '../../../components/CardDisplay.tsx'
import { clickAudio } from '../../../constants/audios.ts'
import { CloseButton } from '../../../components/CloseButton.tsx'
import { Product } from '../models/Product.ts'
import { Card } from '../../../models/Card.ts'

export function PackOpener () {
  const { getOwnedProduct, getOwnedCards, setOwnedProduct } = useShop()
  const [showCards, setShowCards] = useState<boolean>(false)
  const { playAudio } = useSettings()
  const ownedProduct: Product | null = getOwnedProduct()

  if (!ownedProduct) return null

  const ownedCards: Card[] = getOwnedCards()

  const handleAnimationEnd = (): void => {
    setShowCards(true)
  }

  const handleClose = (): void => {
    setOwnedProduct(null)
    playAudio(clickAudio)
  }

  return (
    <section className='relative w-full min-h-[100vh] pb-[3%]'>
      {showCards && (
        <header className='bg-v_black border-b-[1px] border-[#fff] w-full h-[150px] sticky top-0 flex items-center justify-start z-[30] animate-show'>
          <CloseButton
            onClose={handleClose}
            className='w-[clamp(10px,100%,200px)] ml-[1%]'
          />
        </header>
      )}

      <div className='w-full h-full grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-[3%] p-[1%] place-items-center'>
        {showCards ? (
          <>
            {ownedCards.map((card, index) => (
              <CardDisplay className='animate-show' key={index} card={card} />
            ))}
          </>
        ) : (
          <PackDisplay
            pack={ownedProduct.pack}
            onAnimationEnd={handleAnimationEnd}
          />
        )}
      </div>
    </section>
  )
}
