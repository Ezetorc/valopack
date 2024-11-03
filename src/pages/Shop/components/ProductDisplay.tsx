import { useShop } from '../hooks/useShop'
import { getLightColor } from '../../../utilities/getLightColor'
import { Product } from '../../../models/Product'
import sounds from '../../../constants/sounds'
import './ProductDisplay.css'
import { useSettings } from '../../../hooks/useSettings'

export function ProductDisplay (product: Product) {
  const { setSelectedProduct } = useShop()
  const { texts } = useSettings()
  const { color, identifier, amount, price, pack } = product
  const lightColor: string = getLightColor(color, 0.4)
  const backgroundStyle: { background: string } = {
    background: `linear-gradient(0deg, ${color} 0%, ${lightColor} 100%)`
  }
  const name: string = texts.packs[identifier]

  const handleMouseEnter = () => {
    sounds.hover.play()
  }

  const handleClick = () => {
    setSelectedProduct({ pack, color, amount, price, identifier })
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