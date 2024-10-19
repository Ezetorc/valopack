import { useEffect } from 'react'
import useSettings from '../../hooks/useSettings'
import useUser from '../../hooks/useUser'
import useShop from '../../hooks/useShop'
import Opener from '../Opener/Opener'
import { ProductDisplay } from '../ProductDisplay/ProductDisplay'
import BuyModal from '../BuyModal/BuyModal'
import { sectionsBackgrounds } from '../../constants/sectionsBackground'
import './Shop.css'

export default function Shop () {
  const { ownedProduct, selectedProduct, products } = useShop()
  const { credits } = useUser()
  const { texts, updateSection } = useSettings()
  const canBuy: boolean = selectedProduct
    ? credits >= selectedProduct.product.price
    : false

  useEffect(() => {
    updateSection(texts.shop, sectionsBackgrounds.shop, true)
  })

  return (
    <>
      {selectedProduct && <BuyModal canBuy={canBuy} />}

      {!ownedProduct ? (
        <section className='shop'>
          {products.map((product, index) => (
            <ProductDisplay
              key={index}
              product={product.product}
              color={product.color}
              amount={product.amount}
            />
          ))}
        </section>
      ) : (
        <Opener />
      )}
    </>
  )
}
