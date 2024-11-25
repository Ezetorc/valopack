import { useState } from 'react'
import { useShop } from '../hooks/useShop.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { PackDisplay } from './PackDisplay.tsx'
import CardDisplay from '../../../components/CardDisplay.tsx'
import { clickAudio } from '../../../constants/audios.ts'
import { CloseButton } from '../../../components/CloseButton.tsx'

export function PackOpener () {
  const { ownedProduct, ownedCards, setOwnedProduct } = useShop()
  const [showCards, setShowCards] = useState<boolean>(false)
  const { playAudio } = useSettings()
  if (!ownedProduct) return null

  const handleAnimationEnd = (): void => {
    setShowCards(true)
  }

  const handleClose = (): void => {
    setOwnedProduct(null)
    playAudio(clickAudio)
  }

  return (
    <section className='absolute w-[100vw] min-h-dvh bg-v_opener_gradient z-[100] grid place-items-center'>
      {showCards ? (
        <div className='w-[100vw] min-h-dvh grid justify-items-center'>
          <div className='grid grid-cols-[repeat(auto-fit,_minmax(300px, 1fr))] justify-items-center items-center w-[100vw] min-h-full p-[2%] gap-[2%] animate-show'>
            {ownedCards.map((card, index) => (
              <CardDisplay key={index} card={card} />
            ))}
          </div>

          <CloseButton onClose={handleClose} className='fixed left-0 top-0 m-[2%] w-[10%]' />
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
