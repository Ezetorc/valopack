import { useState } from 'react'
import { useShop } from '../hooks/useShop.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { sounds } from '../../../constants/sounds.ts'
import { PackDisplay } from './PackDisplay.tsx'
import CardDisplay from '../../../components/CardDisplay.tsx'

export function PackOpener () {
  const { ownedProduct, ownedCards, setOwnedProduct } = useShop()
  const [showCards, setShowCards] = useState<boolean>(false)
  const { texts } = useSettings()
  if (!ownedProduct) return null

  const handleAnimationEnd = (): void => {
    setShowCards(true)
  }

  const handleClose = (): void => {
    setOwnedProduct(null)
    sounds.click.play()
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

          <button
            className='sticky bottom-0 border-[2px] border-v_red bg-v_red_gradient font-stroke text-[clamp(40px,_4vw,_100px)] cursor-pointer w-full h-full z-[500] hover:border-white'
            onClick={handleClose}
          >
            {texts.close}
          </button>
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
