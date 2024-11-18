import { useEffect } from 'react'
import { useSettings } from '../../../hooks/useSettings.ts'
import { useUser } from '../../../hooks/useUser.ts'
import { useShop } from '../hooks/useShop.ts'
import { Opener } from './Opener.tsx'
import { BuyModal } from './BuyModal.tsx'
import { backgrounds } from '../../../valopack.config.ts'
import { products } from '../constants/products.ts'
import { ProductDisplay } from './ProductDisplay.tsx'

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
        <section className='p-[2%] gap-[3%] pt-[20vh] grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] justify-items-center w-[100vw] min-h-full'>
          {products.map((product, index) => (
            <ProductDisplay key={index} product={product} />
          ))}
        </section>
      ) : (
        <Opener />
      )}
    </>
  )
}
