import { useEffect } from 'react'
import { useSettings } from '../../../hooks/useSettings'
import { useUser } from '../../../hooks/useUser'
import { useShop } from '../hooks/useShop'
import { Opener } from './Opener'
import { ProductDisplay } from './ProductDisplay'
import { BuyModal } from './BuyModal'
import { backgrounds } from '../../../valopack.config'
import './Shop.css'
import { products } from '../constants/products'

export default function Shop () {
  const { ownedProduct, selectedProduct } = useShop()
  const { credits } = useUser()
  const { texts, updateSection } = useSettings()
  const canBuy: boolean = selectedProduct
    ? credits >= selectedProduct.price
    : false

  useEffect(() => {
    updateSection(texts.shop, backgrounds.shop, true)
  })

  return (
    <>
      {selectedProduct && <BuyModal canBuy={canBuy} />}

      {!ownedProduct ? (
        <section className='shop'>
          {products.map((product, index) => (
            <ProductDisplay
              key={index}
              pack={product.pack}
              color={product.color}
              amount={product.amount}
              price={product.price}
              identifier={product.identifier}
            />
          ))}
        </section>
      ) : (
        <Opener />
      )}
    </>
  )
}
