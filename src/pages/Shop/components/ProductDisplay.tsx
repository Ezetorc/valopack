import { useShop } from '../hooks/useShop.ts'
import { getLightColor } from '../../../utilities/getLightColor.ts'
import { Product } from '../models/Product.ts'
import { useSettings } from '../../../hooks/useSettings.ts'

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
    playAudio("hover")
  }

  const handleClick = (): void => {
    setSelectedProduct(product)
  }

  return (
    <button
      onMouseEnter={handleMouseEnter}
      className='w-full max-w-[clamp(300px,30vw,500px)] aspect-[1/1.5] grid grid-rows-[1fr_3fr] relative bg-transparent border-none cursor-pointer group'
      onClick={handleClick}
    >
      <img
        className='w-[70%] absolute translate-x-[20%] transition-transform group-hover:translate-x-[20%] group-hover:translate-y-[-5%]'
        src={pack.image}
        title={name}
        alt={`${name} image`}
      />
      <div
        className='border-y-[2px] border-white aspect-[1/1.3] row-[2] grid grid-rows-[7fr,_1fr,_1fr]'
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
