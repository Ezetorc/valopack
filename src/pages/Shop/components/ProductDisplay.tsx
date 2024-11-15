import { useShop } from '../hooks/useShop.ts'
import { getLightColor } from '../../../utilities/getLightColor.ts'
import { Product } from '../models/Product.ts'
import { sounds } from '../../../constants/sounds.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import './ProductDisplay.css'

export function ProductDisplay ({ product }: { product: Product }) {
  const { setSelectedProduct } = useShop()
  const { texts } = useSettings()
  const { color, identifier, cardsAmount, price, pack } = product
  const lightColor: string = getLightColor(color, 0.4)
  const name: string = texts.packs[identifier]
  const backgroundStyle: { background: string } = {
    background: `linear-gradient(0deg, ${color} 0%, ${lightColor} 100%)`
  }

  const handleMouseEnter = () => {
    sounds.hover.play()
  }

  const handleClick = () => {
    setSelectedProduct({ pack, color, cardsAmount, price, identifier })
  }

  return (
    <button
      onMouseEnter={handleMouseEnter}
      className='product'
      onClick={handleClick}
    >
      <img src={pack.image} title={name} alt={`${name} image`} />
      <div className='product__subcontainer' style={backgroundStyle}>
        <span>{name}</span>
        <span>{`$${price}`}</span>
      </div>
    </button>
  )
}
