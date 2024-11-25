import { useShop } from '../hooks/useShop.ts'
import { getLightColor } from '../../../utilities/getLightColor.ts'
import { Product } from '../models/Product.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { hoverAudio } from '../../../constants/audios.ts'

export function ProductDisplay ({ product }: { product: Product }) {
  const { setSelectedProduct } = useShop()
  const { texts, playAudio } = useSettings()
  const { color, identifier, price, pack } = product
  const lightColor: string = getLightColor(color, 0.4)
  const name: string = texts.packs[identifier]
  const backgroundStyle: { background: string } = {
    background: `linear-gradient(0deg, ${color} 0%, ${lightColor} 100%)`
  }

  const handleMouseEnter = (): void => {
    playAudio(hoverAudio)
  }

  const handleClick = (): void => {
    setSelectedProduct(product)
  }

  return (
    <button
      onMouseEnter={handleMouseEnter}
      className='w-full max-w-[400px] aspect-[1/1.5] grid grid-rows-[1fr_3fr] relative bg-transparent border-none cursor-pointer'
      onClick={handleClick}
    >
      <img
        className='w-[70%] absolute translate-x-[20%] transition-transform hover:translate-x-[20%] hover:translate-y-[-5%]'
        src={pack.image}
        title={name}
        alt={`${name} image`}
      />
      <div
        className='border-[3px] border-white aspect-[1/1.3] row-[2] grid grid-rows-[7fr,_1fr,_1fr]'
        style={backgroundStyle}
      >
        <span className='font-stroke flex items-center justify-start pl-[2%] overflow-hidden row-[2] text-[clamp(30px,_3vw,_50px)]'>
          {name}
        </span>
        <span className='font-stroke flex items-center justify-start pl-[2%] overflow-hidden row-[3] text-[clamp(40px,_2.5vw,_70px)]'>{`$${price}`}</span>
      </div>
    </button>
  )
}
