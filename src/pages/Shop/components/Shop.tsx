import { useEffect } from 'react'
import { useSettings } from '../../../hooks/useSettings.ts'
import { useUser } from '../../../hooks/useUser.ts'
import { useShop } from '../hooks/useShop.ts'
import { Opener } from './Opener.tsx'
import { ProductDisplay } from './ProductDisplay.tsx'
import { BuyModal } from './BuyModal.tsx'
import { backgrounds } from '../../../valopack.config.ts'
import './Shop.css'
import { products } from '../constants/products.ts'

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
